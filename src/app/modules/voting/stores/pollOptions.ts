import { Modules } from 'klayr-sdk';

//only poll creator create poll options
export interface PollOptionStoreData {
    pollId: string;
    text: string;
    votes: number;
    // pollCreator:Buffer;
}


export const pollOptionStoreSchema = {
    $id: 'voting/pollOptions',
    type: 'object',
    required: ['pollId', 'text', 'votes'],
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
        // pollCreator: {
        //     dataType: 'Buffer',
        //     fieldNumber: 4
        // }
    },
};

export class PollOptionsStore extends Modules.BaseStore<PollOptionStoreData> {
    public schema = pollOptionStoreSchema;
}