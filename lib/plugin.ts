import { Plugin } from "@nuxt/types";
import { Library, Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    gm_authFailure?: Function;
    google?: any;
  }
}

type LibraryReturnType = {
  core: google.maps.CoreLibrary;
  maps: google.maps.MapsLibrary;
  places: google.maps.PlacesLibrary;
  geocoding: google.maps.GeocodingLibrary;
  routes: google.maps.RoutesLibrary;
  marker: google.maps.MarkerLibrary;
  geometry: google.maps.GeometryLibrary;
  elevation: google.maps.ElevationLibrary;
  streetView: google.maps.StreetViewLibrary;
  journeySharing: google.maps.JourneySharingLibrary;
  drawing: google.maps.DrawingLibrary;
  visualization: google.maps.VisualizationLibrary;
};

type DefaultReturnType = google.maps.PlacesLibrary;

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

export async function getGoogleMapsInstance<T extends Library = Library>(
  arg?: "destroy" | { name?: T; language?: string; region?: string },
): Promise<
  | (T extends keyof LibraryReturnType
      ? LibraryReturnType[T]
      : DefaultReturnType)
  | undefined
> {
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
