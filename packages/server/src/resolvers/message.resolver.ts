import {
	Arg,
	Resolver,
	Mutation,
	Query,
	Subscription,
	PubSub,
	PubSubEngine,
	Root,
	Ctx,
} from 'type-graphql';
import MessageModel, { Message } from '../models/message.model';
import { Context } from '../types';

@Resolver()
export class MessageResolver {
	@Query(() => [Message])
	async messages(
		@Ctx() { req }: Context,
		@Arg('user') user: string
	): Promise<Message[]> {
		return await MessageModel.find({
			$or: [
				{
					$and: [
						{ receiver: { $eq: user } },
						{ sender: { $eq: req.session.userId } },
					],
				},
				{
					$and: [
						{ receiver: { $eq: req.session.userId } },
						{ sender: { $eq: user } },
					],
				},
			],
		});
	}

	@Subscription({
		topics: 'messageAdded',
		filter: ({ context, payload }) => {
			if (context.req.session.userId === payload.receiver.toString()) {
				return true;
			}

			return false;
		},
	})
	newMessage(@Root() message: Message): Message {
		return message;
	}

	@Mutation(() => Message)
	async addMessage(
		@Ctx() { req }: Context,
		@Arg('text') text: string,
		@Arg('receiver') receiver: string,
		@PubSub() pubsub: PubSubEngine
	): Promise<Message> {
		const message = await MessageModel.create({
			text,
			receiver,
			sender: req.session.userId,
		});

		pubsub.publish('messageAdded', message.toJSON());

		return message;
	}
}
