import { Awaitable, Command } from '@sapphire/framework';
import { ModalSubmitInteraction } from 'discord.js';
import './register';

export class ModalCommand extends Command {
  constructor(ctx: Command.Context, options: Command.Options) {
    super(ctx, {
      ...options,
    });
  }

  /**
   * Runs when a modal is submitted. The modal must have a custom ID in the format:
   * `(command name)--custom ID
   * The double dashes can be changed in the client options, but the separator must always be included in the modal custom ID.
   * @param {ModalSubmitInteraction} interaction The interaction passed down from the modal submit event
   */
  public modalRun?(interaction: ModalSubmitInteraction): Awaitable<unknown>;
}
export * from './register';
