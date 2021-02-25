import path from "path";
import { getGoogleMapsInstance } from "./plugin";

declare module "vue/types/vue" {
  interface Vue {
    $gmaps: typeof getGoogleMapsInstance;
  }
}

export default function MapsModule(this: any): void {
  const defaults = {
    i18n: false,
    libraries: [],
  };

  const options = Object.assign({}, defaults, this.options.maps);
  if (typeof options.apiKey !== "string" || !options.apiKey.length) {
    throw new Error("nuxt-maps: apiKey is required");
  }

  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    ssr: "false",
    options,
  });
}
