import type { Library } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    gm_authFailure?: Function;
    google?: any;
  }

  type NuxtMapsInstance = {
    drawing: typeof google.maps.drawing;
    geometry: typeof google.maps.geometry;
    journeySharing: typeof google.maps.journeySharing;
    localContext: typeof google.maps.localContext;
    maps: typeof google.maps.maps3d;
    marker: typeof google.maps.marker;
    places: typeof google.maps.places;
    visualization: typeof google.maps.visualization;
  };

  type NuxtMapsLibrary = Extract<keyof NuxtMapsInstance, Library>;
}
