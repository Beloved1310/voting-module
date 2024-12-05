import { Modules, Types } from 'klayr-sdk';
import { PollStore, PollStoreData } from './stores/poll';
import { PollOptionStoreData, PollOptionsStore } from './stores/pollOptions';
import { VoteStore, VoteStoreData } from './stores/vote';

export class VotingEndpoint extends Modules.BaseEndpoint {
	public async getPoll(ctx: Types.ModuleEndpointContext): Promise<PollStoreData> {
		const pollStore = this.stores.get(PollStore);
		const { pollId } = ctx.params;

		if (!pollId) {
			throw new Error('The operation cannot be performed, provide the pollId to get the poll');
		}

		const pollMessage = await pollStore.get(ctx, Buffer.from(pollId as string));
		return pollMessage;
	}

	public async getPollOptionsVote(
		ctx: Types.ModuleEndpointContext,
	): Promise<{ pollMessage: PollStoreData; pollOptionMessage: Partial<PollOptionStoreData> }> {
		const { pollId: paramPollId, text } = ctx.params;

		if (!paramPollId && text) {
			throw new Error(
				'The operation cannot be performed, provide the pollId and text to get poll options',
			);
		}

		const pollStore = this.stores.get(PollStore);
		const pollOptionsStore = this.stores.get(PollOptionsStore);

		let pollMessage: PollStoreData;
		try {
			pollMessage = await pollStore.get(ctx, Buffer.from(paramPollId as string));
		} catch (error) {
			pollMessage = { pollId: '', title: '', description: '', pollCreator: '', timestamp: 0 };
		}
		// Get the poll message for the address from the store
		let pollOptionMessageWithoutPollId: PollOptionStoreData;
		try {
			pollOptionMessageWithoutPollId = await pollOptionsStore.get(ctx, Buffer.from(text as string));
		} catch (error) {
			pollOptionMessageWithoutPollId = { pollId: '', text: '', votes: 0 };
		}

		const { pollId, ...pollOptionMessage } = pollOptionMessageWithoutPollId;
		// Return the messages
		return { pollMessage, pollOptionMessage };
	}

	public async getVoters(ctx: Types.ModuleEndpointContext): Promise<VoteStoreData> {
		const voterStore = this.stores.get(VoteStore);
		const { userId } = ctx.params as { userId: string };

		if (!userId) {
			throw new Error('The operation cannot be performed, provide the userId to get the voter');
		}

		let voteMessage: VoteStoreData;
		try {
			voteMessage = await voterStore.get(ctx, Buffer.from(userId));
		} catch (error) {
			voteMessage = { pollId: '', userId: '', text: '' };
		}

		return voteMessage;
	}
}
