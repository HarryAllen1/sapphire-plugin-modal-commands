import { Events, Listener } from '@sapphire/framework';
import { Interaction } from 'discord.js';

export class PluginListener extends Listener<typeof Events.InteractionCreate> {
  constructor(ctx: Listener.Context) {
    super(ctx, {
      event: Events.InteractionCreate,
    });
  }

  run(interaction: Interaction) {
    if (!interaction.isModalSubmit()) return;
    const separator =
      this.container.client.options.modalCommands?.separator ?? '--';
    if (
      typeof this.container.stores
        .get('commands')
        .get(interaction.customId.split(separator)[0])?.modalRun === 'function'
    )
      // @ts-ignore
      this.container.stores
        .get('commands')
        .get(interaction.customId.split(separator)[0])
        .modalRun(interaction);
  }
}
