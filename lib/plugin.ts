import { Plugin } from "@nuxt/types";
import { Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    gm_authFailure: any
    google: any
  }
}

let loader: Loader | null;

function _isTrue(val: string): boolean {
  return val === "true";
}

async function loadGoogleMaps(
  language?: string,
  region?: string
): Promise<void> {
  if (!language && _isTrue("<%= options.i18n %>")) {
    language = window.$nuxt.$i18n.locale;
  }

  loader = new Loader({
    apiKey: "<%= options.apiKey %>",
    language: language,
    region: region,
    version: "quarterly",
    libraries: ["places"],
    retries: 3,
  });

  await loader.load();
}

export async function getGoogleMapsInstance(
  arg?: "destroy" | { language?: string; region?: string }
): Promise<typeof google.maps | void> {
  if (arg === "destroy") {
    if (loader) {
      loader.deleteScript();
    }

    delete window.gm_authFailure;
    delete window.google;
    loader = null;

    const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
    scripts.forEach((script) => script.remove());

    return;
  }

  if (!loader || !window.google?.maps) {
    await loadGoogleMaps(arg?.language, arg?.region);
  }

  return window.google?.maps;
}

const googleMapsPlugin: Plugin = (ctx, inject): void => {
  inject("gmaps", getGoogleMapsInstance);
};

export default googleMapsPlugin;
