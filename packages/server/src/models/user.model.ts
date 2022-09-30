import { Field, ID, ObjectType, InputType } from 'type-graphql';
import {
	prop as Property,
	modelOptions,
	getModelForClass,
	pre,
} from '@typegoose/typegoose';
import * as argon2 from 'argon2';

@InputType('SignupUserInputType')
export class SignupUserInputType {
	@Field()
	name!: string;

	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field()
	passwordConfirm!: string;
}

@InputType('LoginUserInputType')
export class LoginUserInputType {
	@Field()
	email!: string;

	@Field()
	password!: string;
}

@pre<User>('save', async function (next) {
	if (this.loginType !== 'local') return next();

	if (!this.isModified('password') && !this.isNew) return next();

	this.password = await argon2.hash(this.password, { saltLength: 14 });
	this.passwordConfirm = undefined as any;

	next();
})
@ObjectType()
@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class User {
	@Field(() => ID)
	readonly _id!: string;

	@Field()
	@Property({
		required: [true, 'Please provide your name'],
		trim: true,
	})
	name!: string;

	@Property({
		default: 'local',
	})
	loginType!: string;

	@Field()
	@Property({
		required: [true, 'Please provide your email'],
		unique: true,
		trim: true,
		lowercase: true,
	})
	email!: string;

	@Property({
		minlength: 8,
		select: false,
	})
	password!: string;

	@Property({
		select: false,
		validate: {
			validator: function (this: User, el: string) {
				return el === this.password;
			},
		},
	})
	passwordConfirm!: string;

	@Field({ nullable: true })
	@Property({})
	photo?: string;

	@Field()
	readonly createdAt!: Date;

	@Field()
	readonly updated!: Date;

	async verifyPassword(hash: string, plain: string) {
		return await argon2.verify(hash, plain);
	}
}

const UserModel = getModelForClass(User);

export default UserModel;
