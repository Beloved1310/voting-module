/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/member-ordering */
import {
	Modules,
	StateMachine,
} from 'klayr-sdk';
import { VotingEndpoint } from './endpoint';
import { VotingMethod } from './method';
import { PollStore } from './stores/poll';
import { VoteStore } from './stores/vote';

export class VotingModule extends Modules.BaseModule {
    public endpoint = new VotingEndpoint(this.stores, this.offchainStores);
    public method = new VotingMethod(this.stores, this.events);
    public commands = [];

	public constructor() {
		super();
		// registeration of stores and events
		this.stores.register(PollStore, new PollStore(this.name, 0));
	    this.stores.register(VoteStore, new VoteStore(this.name, 1));
	}

	public metadata(): Modules.ModuleMetadata {
		return {
			...this.baseMetadata(),
			endpoints: [],
			assets: [],
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
