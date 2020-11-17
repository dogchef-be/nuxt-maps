import { Plugin } from "@nuxt/types";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "<%= options.apiKey %>",
  version: "weekly",
  libraries: ["places"],
});

export async function getGoogleMapsInstance(
  arg?: "destroy"
): Promise<typeof google.maps> {
  if (arg === "destroy") {
    loader.deleteScript();
  }

  let instance = window.google.maps;

  if (!instance) {
    await loader.load();
  }

  return instance;
}

const googleMapsPlugin: Plugin = (ctx, inject): void => {
  inject("gmaps", getGoogleMapsInstance);
};

export default googleMapsPlugin;
