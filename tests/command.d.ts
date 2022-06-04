import { Command } from '@sapphire/framework';
import '../src/register';
export declare class UserCommand extends Command {
    constructor(ctx: Command.Context, options: Command.Options);
    modalRun(): void;
}
