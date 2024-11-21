/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'klayr-sdk';
import { VotingModule } from "./modules/voting/module";

export const registerModules = (_app: Application): void => {

    app.registerModule(new VotingModule());
};
