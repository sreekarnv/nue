import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import UserModel, {
	LoginUserInputType,
	SignupUserInputType,
	User,
} from '../models/user.model';
import { Context } from '../types';

@Resolver()
export class AuthResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() { req }: Context) {
		if (!req.session.userId) {
			return null;
		}

		const user = await UserModel.findById(req.session.userId);

		return user;
	}

	@Mutation(() => User)
	async signup(@Arg('input') input: SignupUserInputType) {
		const { email, name, password, passwordConfirm } = input;

		const user = await UserModel.create({
			email,
			name,
			password,
			passwordConfirm,
		});

		return user;
	}

	@Mutation(() => User)
	async login(
		@Ctx() { req }: Context,
		@Arg('input') input: LoginUserInputType
	) {
		const { email, password } = input;

		const user = await UserModel.findOne({
			email,
		}).select('+password');

		if (!user || !(await user.verifyPassword(user.password, password))) {
			throw new Error('User not found');
		}

		req.session.userId = user._id;

		return user;
	}

	@Mutation(() => Boolean, { nullable: true })
	async logout(@Ctx() { req }: Context) {
		req.session.destroy((err) => {
			if (err) {
				console.log(err);
				return null;
			}

			return true;
		});

		return true;
	}

	@Query(() => [User])
	async users(@Ctx() { req }: Context) {
		return await UserModel.find({ _id: { $ne: req.session.userId } });
	}

	@Query(() => User)
	async user(@Arg('_id') _id: string) {
		return await UserModel.findById(_id).select('_id name');
	}
}
