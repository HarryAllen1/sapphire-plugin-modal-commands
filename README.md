# Sapphire Plugin Modal Commands

This plugin allows Discord bots using the [Sapphire Framework](https://npmjs.com/package/@sapphire/framework) to include modal submit logic in the same file as other command logic.

Example:

Typescript:

```ts
// src/lib/setup.ts
import 'sapphire-plugin-modal-commands/register';

// src/commands/modal.ts
import { Command, SapphireClient } from '@sapphire/framework';
import {
  ActionRowBuilder,
  ModalBuilder,
  ModalActionRowComponentBuilder,
  ModalSubmitInteraction,
  TextInputComponent,
  TextInputStyle,
} from 'discord.js';

export class UserCommand extends Command {
  constructor(ctx: Command.Context, options: Command.Options) {
    super(ctx, {
      ...options,
      name: 'example',
      chatInputCommand: {
        register: true,
      },
    });
  }

  chatInputRun(interaction: Command.ChatInputInteraction) {
    interaction.showModal(
      new ModalBuilder()
        .setTitle('Modal Example')
        // format: (command name)--(customId)
        // The separator can be changed in the client options (options.modalCommands.separator)
        .setCustomId('example--example-modal')
        .addComponents(
          new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            new TextInputComponent()
              .setLabel('Example Input')
              .setCustomId('example-input')
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          )
        )
    );
  }

  // Triggered on the modal submit
  modalRun(interaction: ModalSubmitInteraction) {
    interaction.reply('Submitted!');
  }
}
```
