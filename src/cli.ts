import meow from "meow";

const tweets = (argv: string[]) => {
  const cli = meow(
    `
    Usage
      $ foo <input>

    Options
      --rainbow, -r  Include a rainbow

    Examples
      $ foo unicorns --rainbow
      🌈 unicorns 🌈
  `,
    {
      importMeta: import.meta,
      flags: {
        rainbow: {
          type: "boolean",
          alias: "r",
        },
      },
    }
  );
  console.log(argv);
};

export default CliRunner;
