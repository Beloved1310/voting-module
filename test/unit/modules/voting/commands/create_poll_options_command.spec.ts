import { CreatePollOptionsCommand } from '../../../../../src/app/modules/voting/commands/create_poll_options_command';

describe('CreatePollOptionsCommand', () => {
  let command: CreatePollOptionsCommand;

	beforeEach(() => {
		command = new CreatePollOptionsCommand();
	});

	describe('constructor', () => {
		it('should have valid name', () => {
			expect(command.name).toEqual('createPollOptions');
		});

		it('should have valid schema', () => {
			expect(command.schema).toMatchSnapshot();
		});
	});

	describe('verify', () => {
		describe('schema validation', () => {
      it.todo('should throw errors for invalid schema');
      it.todo('should be ok for valid schema');
    });
	});

	describe('execute', () => {
    describe('valid cases', () => {
      it.todo('should update the state store');
    });

    describe('invalid cases', () => {
      it.todo('should throw error');
    });
	});
});
