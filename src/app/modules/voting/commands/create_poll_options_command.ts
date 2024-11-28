/* eslint-disable class-methods-use-this */
import { Modules, StateMachine } from 'klayr-sdk';
import { PollOptionsStore, PollOptionStoreData } from '../stores/pollOptions';
import { PollStore } from '../stores/poll';

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
		// const { senderAddress } = _context.transaction;
		const pollOptionStore = this.stores.get(PollOptionsStore);
		const pollStore = this.stores.get(PollStore);
		const currentDate = new Date();
		const currentDateString = currentDate.toISOString().split('T')[0];

		const pollStoreData = await pollStore.get(_context, Buffer.from('pollId'));
		if (currentDateString > pollStoreData.expiresAt) {
			throw new Error('This Poll is expired');
		}
		const newPollOption: PollOptionStoreData = {
			pollId,
			text,
			votes: 0,
		};

		await pollOptionStore.set(_context, Buffer.from(text), newPollOption);
	}
}
