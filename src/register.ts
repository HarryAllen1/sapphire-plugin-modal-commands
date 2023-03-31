import {
  Awaitable,
  Plugin,
  postInitialization,
  SapphireClient,
} from '@sapphire/framework';
import { ModalSubmitInteraction } from 'discord.js';
import { join } from 'node:path';

export class ModalCommandsPlugin extends Plugin {
  public static [postInitialization](this: SapphireClient): void {
    if (
      this.options.modalCommands?.separator === '' &&
      !this.options.modalCommands.unsafeUseAnEmptyStringAsSeparator
    )
      throw new TypeError(
        `The separator for the modal commands plugin cannot be an empty string (otherwise every modal interaction will trigger every command).
If you want to use an empty string, set \`client.options.modalCommands.unsafeUseAnEmptyStringAsSeparator\` to true.'`
      );
    this.stores.get('listeners').registerPath(join(__dirname, 'listeners'));
  }
}

SapphireClient.plugins.registerPostInitializationHook(
  ModalCommandsPlugin[postInitialization],
  'ModalCommands-PostInitialization'
);

declare module '@sapphire/framework' {
  export interface Command {
    /**
     * Runs when a modal is submitted. The modal must have a custom ID in the format:
     * `(command name)--custom ID
     * The double dashes can be changed in the client options, but the separator must always be included in the modal custom ID.
     * @param {ModalSubmitInteraction} interaction The interaction passed down from the modal submit event
     */
    modalRun?(interaction: ModalSubmitInteraction): Awaitable<unknown>;
  }
}

export interface ModalCommandsPluginOptions {
  /**
   * The separator in the modal custom id that separates the command name
   */
  separator?: string;
  /**
   * Allows an empty string as a separator, which is unsafe since every modal interaction will trigger every command.
   */
  unsafeUseAnEmptyStringAsSeparator?: boolean;
}

declare module 'discord.js' {
  export interface ClientOptions {
    /**
     * Config options for the modal commands plugin
     */
    modalCommands?: ModalCommandsPluginOptions;
  }
}
