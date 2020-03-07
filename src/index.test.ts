let onSpy: jest.Mock;

const spawn = jest.fn(() => {
  let localcb = () => {};
  onSpy = jest.fn(function on(_: string, cb: () => void) {
    localcb = cb;
  });
  setTimeout(() => {
    localcb && localcb();
  }, 1000);
  return { on: onSpy };
});

jest.doMock("child_process", () => ({ spawn }));

import { listFiles } from ".";

describe("list", () => {
  it("should run spawn", async () => {
    await listFiles(() => {
      console.log("callback");
    });
    expect(spawn).toHaveBeenCalledWith("ls", ["-l"], { stdio: "inherit" });
    expect(onSpy).toHaveBeenCalled();
  });
});
