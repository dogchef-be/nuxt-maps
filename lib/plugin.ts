import { Plugin } from "@nuxt/types";
import { Library, Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    gm_authFailure?: Function;
    google?: any;
  }
}

const RETRIES: number = Number("<%= options.retries %>");

let loader: Loader | undefined;

function _isTrue(val: string): boolean {
  return val === "true";
}

async function loadGoogleMaps(
  name: Library,
  language?: string,
  region?: string,
): Promise<boolean> {
  if (!language && _isTrue("<%= options.i18n %>")) {
    language = window.$nuxt.$i18n.locale;
  }

  loader = new Loader({
    apiKey: "<%= options.apiKey %>",
    language: language,
    region: region,
    version: "quarterly",
    libraries: ["places"],
    retries: RETRIES,
  });

  try {
    await loader.importLibrary(name);
  } catch (err: any) {
    return false;
  }

  return true;
}

export async function getGoogleMapsInstance(
  arg?: "destroy" | { name: Library; language?: string; region?: string },
): Promise<typeof google.maps | undefined> {
  if (arg === "destroy") {
    if (loader) {
      loader.deleteScript();
    }

    window.gm_authFailure = undefined;
    window.google = undefined;
    loader = undefined;

    const scripts = document.querySelectorAll(
      'script[src*="maps.googleapis.com"]',
    );
    scripts.forEach((script) => script.remove());

    return undefined;
  }

  if (!loader || !window.google?.maps) {
    const isLoaded = await loadGoogleMaps(
      arg?.name ?? "places",
      arg?.language,
      arg?.region,
    );

    if (!isLoaded) {
      throw new Error(
        `nuxt-maps: Failed to load google maps library after ${RETRIES} retries`,
      );
    }
  }

  return window.google?.maps;
}

const googleMapsPlugin: Plugin = (_, inject): void => {
  inject("gmaps", getGoogleMapsInstance);
};

export default googleMapsPlugin;
