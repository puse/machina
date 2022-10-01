import { noop } from "./noop";

describe("noop", () => {
  test("returns nothing", () => {
    expect(noop()).toBeUndefined();
  });
});
