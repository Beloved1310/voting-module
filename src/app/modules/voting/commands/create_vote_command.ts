/* eslint-disable class-methods-use-this */
import { Modules, StateMachine } from 'klayr-sdk';
import { VoteStore, VoteStoreData } from '../stores/vote';

import { PollOptionsStore, PollOptionStoreData } from '../stores/pollOptions';

interface Params {
	pollCreator: Buffer;
	pollId: string;
	text: string;
}
let pollVote: PollOptionStoreData;

export const createVoteSchema = {
	$id: 'voting/createVote',
	type: 'object',
	title: 'CreateVoteCommand transaction parameter for the Voting module',
	required: ['pollCreator', 'pollId', 'text'],
	properties: {
		pollCreator: {
			dataType: 'buffer',
			fieldNumber: 1,
		},
		userId: {
			dataType: 'string',
			fieldNumber: 2,
		},
		text: {
			dataType: 'string',
			fieldNumber: 3,
			maxLength: 200,
		},
	},
};
// --if voting has expired
// --vote one text
// --user has not voted before
export class CreateVoteCommand extends Modules.BaseCommand {
	public schema = createVoteSchema;

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verify(
		_context: StateMachine.CommandVerifyContext<Params>,
	): Promise<StateMachine.VerificationResult> {
		return { status: StateMachine.VerifyStatus.OK };
	}

	public async execute(_context: StateMachine.CommandExecuteContext<Params>): Promise<void> {
		const { pollCreator, pollId, text } = _context.params;
		const { senderAddress } = _context.transaction;
		const pollOptionStore = this.stores.get(PollOptionsStore);

		const voteStore = this.stores.get(VoteStore);
		// let pollVote: PollOptionStoreData;

		// 3. Get the poll counter from the counter store.
		pollVote = await pollOptionStore.get(_context, pollCreator);
		// try {
		// 	//can't someone get by pollId if you do not sign by the pollId
		// 	pollVote = await pollOptionStore.get(_context, pollCreator);
		// } catch (error) {
		// 	pollVote.votes = 0,
		// }
		pollVote.votes += 1;
		const newVoter: VoteStoreData = {
			pollId,
			voter: senderAddress,
			text,
		};
		// 6. Save the poll options to the poll store.
		await pollOptionStore.set(_context, pollCreator, pollVote);

		await voteStore.set(_context, senderAddress, newVoter);
	}
}
