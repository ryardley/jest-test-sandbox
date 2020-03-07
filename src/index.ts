import { spawn } from "child_process";

export function listFiles(callback: (msg: string) => void) {
  return new Promise(res => {
    spawn("ls", ["-l"], { stdio: "inherit" }).on("exit", () => {
      callback("Process exited");
      res();
    });
  });
}

// listFiles(msg => {
//   console.log(msg);
// });
