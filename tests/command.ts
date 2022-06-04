import { Command, SapphireClient } from '@sapphire/framework';
import '../src/register';

export class UserCommand extends Command {
  constructor(ctx: Command.Context, options: Command.Options) {
    super(ctx, options);
  }
  override modalRun() {}
}
const client = new SapphireClient({
  intents: [],
  modalCommands: {
    separator: '',
    unsafeUseAnEmptyStringAsSeparator: true,
  },
});
