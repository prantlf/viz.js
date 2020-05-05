import type Viz from "./index.js";
import type { Worker } from "worker_threads";
import type { RenderOptions } from "./types";

let viz: Viz;
export default async function renderStringSync(
  src: string,
  options?: RenderOptions
): Promise<string> {
  if (viz == null) {
    const [Viz, getWorker] = await Promise.all([
      // @ts-ignore
      import("@aduh95/viz.js"),
      // @ts-ignore
      import("@aduh95/viz.js/worker"),
    ]);
    viz = new Viz.default({ worker: getWorker.default() as Worker });
  }
  return viz.renderString(src, options);
}
