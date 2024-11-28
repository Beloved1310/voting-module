import { Modules, Types, cryptography } from 'klayr-sdk';
import { PollStore, PollStoreData } from './stores/poll';
import { PollOptionsStore, PollOptionStoreData } from './stores/pollOptions';
import { VoteStore, VoteStoreData } from './stores/vote';

export class VotingEndpoint extends Modules.BaseEndpoint {
	public async getPoll(ctx: Types.ModuleEndpointContext): Promise<PollStoreData> {
		const pollStore = this.stores.get(PollStore);

		const { address } = ctx.params;

		if (typeof address !== 'string') {
			throw new Error('Parameter address must be a string.');
		}
		cryptography.address.validateKlayr32Address(address);
		// 4. Get the Hello message for the address from the message store
		const pollMessage = await pollStore.get(
			ctx,
			cryptography.address.getAddressFromKlayr32Address(address),
		);
		// 5. Return the Hello message
		return pollMessage;
	}

	public async getPollOptionsVote(
		ctx: Types.ModuleEndpointContext,
	): Promise<{ pollMessage: PollStoreData; pollOptionMessage: PollOptionStoreData }> {
		const pollStore = this.stores.get(PollStore);
		const pollOptionsStore = this.stores.get(PollOptionsStore);

		const { address } = ctx.params;

		if (typeof address !== 'string') {
			throw new Error('Parameter address must be a string.');
		}

		cryptography.address.validateKlayr32Address(address);

		// Get the poll message for the address from the store
		const pollMessage = await pollStore.get(
			ctx,
			cryptography.address.getAddressFromKlayr32Address(address),
		);

		const pollOptionMessage = await pollOptionsStore.get(
			ctx,
			cryptography.address.getAddressFromKlayr32Address(address),
		);

		// Return the messages
		return { pollMessage, pollOptionMessage };
	}

	public async getVoters(
        ctx: Types.ModuleEndpointContext,
    ): Promise<VoteStoreData> {
        const voters = this.stores.get(VoteStore);
    
        const { address } = ctx.params;
    
        if (typeof address !== 'string') {
            throw new Error('Parameter address must be a string.');
        }
    
        cryptography.address.validateKlayr32Address(address);
    
        // Get the poll message for the address from the store
        const voteMessage = await voters.get(
            ctx,
            cryptography.address.getAddressFromKlayr32Address(address),
        );
    
        // Return the message directly
        return voteMessage;
    }
    
}
