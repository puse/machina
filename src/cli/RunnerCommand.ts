import { RunnerContext } from "./RunnerContext";

export type RunnerCommand = {
  name: string;
  callback: (context: RunnerContext, ...input: string[]) => Promise<unknown>;
};
