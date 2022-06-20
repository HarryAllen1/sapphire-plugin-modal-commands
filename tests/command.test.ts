import { Command, SapphireClient } from "@sapphire/framework";
import { expect, test } from "vitest";
import "../src/register";

test("SapphireClient", () => {
  const client = new SapphireClient({
    intents: [],
    modalCommands: {
      separator: "%%",
    },
  });
  expect(client).toBeTruthy();

  const unsafeClient = new SapphireClient({
    intents: [],
    modalCommands: {
      separator: "",
      unsafeUseAnEmptyStringAsSeparator: true,
    },
  });
  expect(unsafeClient).toBeTruthy();

  expect(
    () =>
      new SapphireClient({
        intents: [],
        modalCommands: {
          separator: "",
        },
      })
  ).toThrowError("cannot be an empty string");
});

test("mock command", () => {
  class UserCommand extends Command {
    constructor(ctx: Command.Context, options: Command.Options) {
      super(ctx, options);
    }
    override modalRun() {}
    messageRun() {}
  }
  expect(
    typeof UserCommand.prototype.container.client.options.modalCommands
      ?.separator
  ).toBe("string");
});
