/* eslint-disable class-methods-use-this */
import { Modules, StateMachine } from 'klayr-sdk';
import { VoteStore, VoteStoreData } from '../stores/vote';

import { PollOptionsStore, PollOptionStoreData } from '../stores/pollOptions';

interface Params {
	pollId: string;
	userId: string;
	text: string;
}
let pollVote: PollOptionStoreData;

export const createVoteSchema = {
	$id: 'voting/createVote',
	type: 'object',
	title: 'CreateVoteCommand transaction parameter for the Voting module',
	required: ['pollId', 'userId', 'text'],
	properties: {
		pollId: {
			dataType: 'string',
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
		const { pollId, userId, text } = _context.params;
		const { senderAddress } = _context.transaction;
		const pollOptionStore = this.stores.get(PollOptionsStore);
		const voteStore = this.stores.get(VoteStore);
		const voterString = senderAddress.toString();
		// let pollVote: PollOptionStoreData;

		// 3. Get the poll counter from the counter store.
		pollVote = await pollOptionStore.get(_context, Buffer.from(text));
		// try {
		// 	//can't someone get by pollId if you do not sign by the pollId
		// 	pollVote = await pollOptionStore.get(_context, pollCreator);
		// } catch (error) {
		// 	pollVote.votes = 0,
		// }
		pollVote.votes += 1;
		const newVoter: VoteStoreData = {
			pollId,
			userId,
			voter: voterString,
			text,
		};
		// 6. Save the poll options to the poll store.
		await pollOptionStore.set(_context, Buffer.from(text), pollVote);

		await voteStore.set(_context, Buffer.from(userId), newVoter);
	}
}
