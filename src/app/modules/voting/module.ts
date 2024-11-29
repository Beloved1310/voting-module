/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/member-ordering */
import {
    Modules
} from 'klayr-sdk';
import { CreatePollCommand } from "./commands/create_poll_command";
import { CreatePollOptionsCommand } from "./commands/create_poll_options_command";
import { CreateVoteCommand } from "./commands/create_vote_command";
import { VotingEndpoint } from './endpoint';
import { VotingMethod } from './method';
import { PollStore } from './stores/poll';
import { VoteStore } from './stores/vote';
import { PollOptionsStore } from './stores/pollOptions';

export class VotingModule extends Modules.BaseModule {
    public endpoint = new VotingEndpoint(this.stores, this.offchainStores);
    public method = new VotingMethod(this.stores, this.events);
    public commands = [new CreatePollCommand(this.stores, this.events), new CreateVoteCommand(this.stores, this.events), new CreatePollOptionsCommand(this.stores, this.events)];

	public constructor() {
		super();
		// registeration of stores and events
		this.stores.register(PollStore, new PollStore(this.name, 0));
		this.stores.register(VoteStore, new VoteStore(this.name, 1));
		this.stores.register(PollOptionsStore, new PollOptionsStore(this.name, 2));
	}

	public metadata(): Modules.ModuleMetadata {
		return {
			...this.baseMetadata(),
			endpoints: [
				{
					name: this.endpoint.getPoll.name,
					request: this.getPollSchema(),
					response: this.getPollResponseSchema(),
				},
				{
					name: this.endpoint.getPollOptionsVote.name,
					request: this.getPollOptionsSchema(),
					response: this.getPollOptionsResponseSchema(),
				},
				{
					name: this.endpoint.getVoters.name,
					request: this.getVotersSchema(),
					response: this.getVotersResponseSchema(),
				},
			],
			assets: [],
		};
	}


	public getPollSchema() {
        return {
            $id: 'voting/getPoll',
            type: 'object',
            properties: {},
        };
    }

	public getVotersSchema() {
        return {
            $id: 'voting/getPoll',
            type: 'object',
            properties: {
				userId: {
					dataType: 'string',
					fieldNumber: 1,
				},
			},
        };
    }
	public getPollOptionsSchema() {
        return {
            $id: 'voting/getPollOption',
            type: 'object',
            properties: {},
        };
    }

	public getPollResponseSchema() {
        return {
            $id: 'voting/getPollResponse',
            type: 'object',
            properties: {
                pollId: {
					dataType: 'string',
					fieldNumber: 1,
				},
				title: {
					dataType: 'string',
					fieldNumber: 2,
				},
				description: {
					dataType: 'string',
					fieldNumber: 3,
				},
				pollCreator:{
					dataType: 'Buffer',
					fieldNumber: 4,
				},
				expiresAt: {
					dataType: 'string',
					fieldNumber: 5,
				},
            },
        };
    }


	public getPollOptionsResponseSchema() {
        return {
            $id: 'voting/getPollOptionsResponse',
            type: 'object',
            properties: {
                pollId: {
					dataType: 'string',
					fieldNumber: 1,
				},
				text: {
					dataType: 'string',
					fieldNumber: 2,
				},
				votes: {
					dataType: 'string',
					fieldNumber: 3,
				},
				title: {
					dataType: 'string',
					fieldNumber: 4,
				},
				description: {
					dataType: 'string',
					fieldNumber: 5,
				},
				pollCreator: {
					dataType: 'string',
					fieldNumber: 6,
				},
				expiresAt: {
					dataType: 'string',
					fieldNumber: 7,
				},
            },
        };
    }

	public getVotersResponseSchema() {
        return {
            $id: 'voting/getVotersResponse',
            type: 'object',
            properties: {
				pollId: {
					dataType: 'string',
					fieldNumber: 1,
				},
				userId: {
					dataType: 'string',
					fieldNumber: 2,
				},
				voter: {
					dataType: 'string',
					fieldNumber: 3,
				},
				text: {
					dataType: 'string',
					fieldNumber: 4,
				},
            },
        };
    }
    // Lifecycle hooks
    // public async init(_args: Modules.ModuleInitArgs): Promise<void> {
	// 	// initialize this module when starting a node
	// }

	// public async insertAssets(_context: StateMachine.InsertAssetContext) {
	// 	// initialize block generation, add asset
	// }

	// public async verifyAssets(_context: StateMachine.BlockVerifyContext): Promise<void> {
	// 	// verify block
	// }

    // Lifecycle hooks
	// public async verifyTransaction(_context: StateMachine.TransactionVerifyContext): Promise<StateMachine.VerificationResult> {
		// verify transaction will be called multiple times in the transaction pool
		// return { status: StateMachine.VerifyStatus.OK };
	// }

	// public async beforeCommandExecute(_context: StateMachine.TransactionExecuteContext): Promise<void> {
	// }

	// public async afterCommandExecute(_context: StateMachine.TransactionExecuteContext): Promise<void> {

	// }
	// public async initGenesisState(_context: StateMachine.GenesisBlockExecuteContext): Promise<void> {

	// }

	// public async finalizeGenesisState(_context: StateMachine.GenesisBlockExecuteContext): Promise<void> {

	// }

	// public async beforeTransactionsExecute(_context: StateMachine.BlockExecuteContext): Promise<void> {

	// }

	// public async afterTransactionsExecute(_context: StateMachine.BlockAfterExecuteContext): Promise<void> {

	// }
}
