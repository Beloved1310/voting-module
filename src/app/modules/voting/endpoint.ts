import { Modules, Types, cryptography } from 'klayr-sdk';
import { PollStore, PollStoreData } from './stores/poll';
import { PollOptionStoreData, PollOptionsStore } from './stores/pollOptions';
import { VoteStore, VoteStoreData } from './stores/vote';

export class VotingEndpoint extends Modules.BaseEndpoint {
	public async getPoll(ctx: Types.ModuleEndpointContext): Promise<PollStoreData> {
		const pollStore = this.stores.get(PollStore);

		const { address } = ctx.params;

		if (typeof address !== 'string') {
			throw new Error('Parameter address must be a string.');
		}
		cryptography.address.validateKlayr32Address(address);

		const pollMessage = await pollStore.get(
			ctx,
			cryptography.address.getAddressFromKlayr32Address(address),
		);
		return pollMessage;
	}

	public async getPollOptionsVote(
		ctx: Types.ModuleEndpointContext,
	): Promise<{ pollMessage: PollStoreData; pollOptionMessage: Partial<PollOptionStoreData> }> {
		const { pollId: paramPollId, text } = ctx.params;

		const pollStore = this.stores.get(PollStore);
		const pollOptionsStore = this.stores.get(PollOptionsStore);

		let pollMessage: PollStoreData;
		try {
			pollMessage = await pollStore.get(ctx, Buffer.from(paramPollId as string));
		} catch (error) {
			pollMessage = { pollId: '', title: '', description: '', pollCreator: '', expiresAt: '' };
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
		let voteMessage: VoteStoreData;
		try {
			const { userId } = ctx.params;
			voteMessage = await voterStore.get(ctx, Buffer.from(userId as string));
		} catch (error) {
			voteMessage = { pollId: '', userId: '', voter: '', text: '' };
		}

		return voteMessage;
	}
}
