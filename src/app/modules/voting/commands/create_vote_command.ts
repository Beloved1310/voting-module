/* eslint-disable class-methods-use-this */
import { Modules, StateMachine } from 'klayr-sdk';
import { VoteStore, VoteStoreData } from '../stores/vote';

import { PollOptionsStore, PollOptionStoreData } from '../stores/pollOptions';

interface Params {
	pollId: string;
	userId: string;
	text: string;
}

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
export class CreateVoteCommand extends Modules.BaseCommand {
	public schema = createVoteSchema;

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verify(
		_context: StateMachine.CommandVerifyContext<Params>,
	): Promise<StateMachine.VerificationResult> {
		const { userId } = _context.params;
		const voteStore = this.stores.get(VoteStore);
		const voter = await voteStore.has(_context, Buffer.from(userId));
		if (voter) {
			_context.logger.info('==== FOUND: voter ====');
			throw new Error(`You have already voted`);
		} else {
			_context.logger.info('==== NotFOUND: new voter ====');
			return { status: StateMachine.VerifyStatus.OK };
		}
	}

	public async execute(_context: StateMachine.CommandExecuteContext<Params>): Promise<void> {
		const { pollId, userId, text } = _context.params;
		const pollOptionStore = this.stores.get(PollOptionsStore);
		const voteStore = this.stores.get(VoteStore);
		let pollVote: PollOptionStoreData;
		// 3. Get the poll counter from the counter store.
		pollVote = await pollOptionStore.get(_context, Buffer.from(text));
		pollVote.votes += 1;
		const newVoter: VoteStoreData = {
			pollId,
			userId,
			text,
		};
		// 6. Save the poll options to the poll store.
		await pollOptionStore.set(_context, Buffer.from(text), pollVote);

		await voteStore.set(_context, Buffer.from(userId), newVoter);
	}
}
