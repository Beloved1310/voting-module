import { Modules } from 'klayr-sdk';

// Define the data structure for the Poll Store
export interface PollStoreData {
	pollId: string;
	title: string;
	description: string;
	pollCreator: string; 
	expiresAt: string;
}

// Define the schema for the poll store
export const pollStoreSchema = {
	$id: 'voting/polls',
	type: 'object',
	required: ['pollId', 'title', 'description', 'pollCreator', 'expiresAt'],
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
		pollCreator: {
			dataType: 'string',
			fieldNumber: 4,
		},
		expiresAt: {
			dataType: 'string',
			fieldNumber: 5,
		},
	},
};

// Create the PollStore class extending the BaseStore class
export class PollStore extends Modules.BaseStore<PollStoreData> {
	public schema = pollStoreSchema;
}
