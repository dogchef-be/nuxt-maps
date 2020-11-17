import path from "path";
import { getMapsInstance } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $maps: typeof getMapsInstance;
  }
}

export default function MapsModule(this: any): void {
  const defaults = {
    key: null,
    libraries: []
  };

  const options = Object.assign({}, defaults, this.options.maps);

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: "false",
    options
  });
}
