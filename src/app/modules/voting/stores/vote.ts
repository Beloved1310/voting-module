import { Modules } from 'klayr-sdk';

// Define the data structure for the Vote Store
export interface VoteStoreData {
    pollId: string;  // ID of the poll that the vote is cast on
    userId: string;  // ID of the user who cast the vote
    optionIndex: number; // Index of the option the user voted for
}

// Define the schema for the vote store
export const voteStoreSchema = {
    $id: 'voting/votes',
    type: 'object',
    required: ['pollId', 'userId', 'optionIndex'],
    properties: {
        pollId: {
            dataType: 'string',
            fieldNumber: 1,
        },
        userId: {
            dataType: 'string',
            fieldNumber: 2,
        },
        optionIndex: {
            dataType: 'number',
            fieldNumber: 3,
        },
    },
};

// Create the VoteStore class extending the BaseStore class
export class VoteStore extends Modules.BaseStore<VoteStoreData> {
    public schema = voteStoreSchema;
}
