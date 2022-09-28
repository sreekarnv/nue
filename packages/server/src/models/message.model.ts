import {
	prop as Property,
	modelOptions,
	Ref,
	getModelForClass,
} from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './user.model';

enum MESSAGE_TYPE {
	DIRECT = 'DIRECT',
}

@ObjectType()
@modelOptions({
	schemaOptions: {
		timestamps: true,
	},
})
export class Message {
	@Field(() => ID)
	readonly _id!: string;

	@Field()
	@Property({
		required: true,
		trim: true,
		minlength: [2, 'message must atleast be 2 characters'],
	})
	text!: string;

	@Field()
	@Property({
		default: MESSAGE_TYPE.DIRECT,
	})
	messageType!: MESSAGE_TYPE;

	@Field(() => User)
	@Property({
		required: true,
		ref: () => User,
	})
	sender!: Ref<User>;

	@Field(() => User)
	@Property({
		required: true,
		ref: () => User,
	})
	receiver!: Ref<User>;

	@Field()
	readonly createdAt!: Date;

	@Field()
	readonly updatedAt!: Date;
}

const MessageModel = getModelForClass(Message);

export default MessageModel;
