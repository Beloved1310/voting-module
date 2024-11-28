/* eslint-disable class-methods-use-this */
import { Modules, StateMachine } from 'klayr-sdk';
import { PollStore, PollStoreData } from '../stores/poll';

interface Params {
	pollId: string;
	pollCreator: string;
	title: string;
	description: string;
	expiresAt: string;
}

export const createPollSchema = {
	$id: 'voting/createPoll',
	type: 'object',
	title: 'CreatePollCommand transaction parameter for the Voting module',
	required: ['pollId', 'title', 'description', 'expiresAt'],
	properties: {
		pollId: {
			dataType: 'string',
			fieldNumber: 1,
		},
		title: {
			dataType: 'string',
			fieldNumber: 2,
			minLength: 3,
			maxLength: 200,
		},
		description: {
			dataType: 'string',
			fieldNumber: 3,
			minLength: 3,
			maxLength: 256,
		},
		expiresAt: {
			dataType: 'string',
			fieldNumber: 4,
		},
	},
};
export class CreatePollCommand extends Modules.BaseCommand {
	public schema = createPollSchema;

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verify(
		_context: StateMachine.CommandVerifyContext<Params>,
	): Promise<StateMachine.VerificationResult> {
		return { status: StateMachine.VerifyStatus.OK };
	}

	public async execute(_context: StateMachine.CommandExecuteContext<Params>): Promise<void> {
		const { pollId, title, description, expiresAt } = _context.params;
		const { senderAddress } = _context.transaction;
		const pollStore = this.stores.get(PollStore);
		const pollCreator = senderAddress.toString();

		const newPoll: PollStoreData = {
			pollId,
			title,
			description,
			pollCreator,
			expiresAt,
		};

		await pollStore.set(_context, Buffer.from(pollId), newPoll);
	}
}
