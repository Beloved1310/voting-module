/* eslint-disable class-methods-use-this */
import { Modules, StateMachine } from 'klayr-sdk';
import { PollOptionsStore, PollOptionStoreData } from '../stores/pollOptions';

interface Params {
	pollId: string;
	text: string;
}

export class CreatePollOptionsCommand extends Modules.BaseCommand {
	public schema = {
		$id: 'voting/createPollOptions',
		type: 'object',
		properties: {
			pollId: {
				dataType: 'string',
				fieldNumber: 1,
			},
			text: {
				dataType: 'string',
				fieldNumber: 2,
				minLength: 3,
				maxLength: 200,
			},
		},
	};

	// eslint-disable-next-line @typescript-eslint/require-await
	public async verify(
		_context: StateMachine.CommandVerifyContext<Params>,
	): Promise<StateMachine.VerificationResult> {
		return { status: StateMachine.VerifyStatus.OK };
	}

	public async execute(_context: StateMachine.CommandExecuteContext<Params>): Promise<void> {
		const { pollId, text } = _context.params;
		const { senderAddress } = _context.transaction;
		const pollOptionStore = this.stores.get(PollOptionsStore);

		const newPollOption: PollOptionStoreData = {
			pollId,
			text,
			votes: 0,
			// pollCreator: senderAddress,
		};

		await pollOptionStore.set(_context, senderAddress, newPollOption);
	}
}