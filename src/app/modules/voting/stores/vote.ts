import { Modules } from 'klayr-sdk';

// Define the data structure for the Vote Store
export interface VoteStoreData {
    pollId: string;  
    voter: Buffer;  
    text: string;
}

// Define the schema for the vote store
export const voteStoreSchema = {
    $id: 'voting/votes',
    type: 'object',
    required: ['pollId', 'userId', 'text'],
    properties: {
        pollId: {
            dataType: 'string',
            fieldNumber: 1,
        },
        voter: {
            dataType: Buffer,
            fieldNumber: 2,
        },
        text: {
            dataType: 'string',
            fieldNumber: 3,
        },
    },
};

// Create the VoteStore class extending the BaseStore class
export class VoteStore extends Modules.BaseStore<VoteStoreData> {
    public schema = voteStoreSchema;
}
