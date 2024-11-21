import { Modules } from 'klayr-sdk';

// Define the data structure for the Poll Store
export interface PollStoreData {
    title: string;
    description: string;
    options: string[];
    createdBy: string; // ID of the user who created the poll
    expiresAt: string; // Date when the poll expires
}

// Define the schema for the poll store
export const pollStoreSchema = {
    $id: 'voting/polls',
    type: 'object',
    required: ['title', 'options', 'createdBy'],
    properties: {
        title: {
            dataType: 'string',
            fieldNumber: 1,
        },
        description: {
            dataType: 'string',
            fieldNumber: 2,
        },
        options: {
            type: 'array',
            items: {
                dataType: 'string',
            },
            fieldNumber: 3,
        },
        createdBy: {
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
