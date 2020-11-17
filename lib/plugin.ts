import { Plugin } from "@nuxt/types";
import { Geocoder, Marker, Map } from "@types/googlemaps";

const API_KEY: string = "<%= options.api_key %>";
const LIBRARIES: string = "<%= options.libraries %>";

export function getMapsInstance(address: string): void {
  if (API_KEY === null) {
    console.warn("Google API Key is not defined.");
  }

  loadScript();

  const location: any = getLocation(address);
  const map: Map = createMap(location);
  setMarker(map, location);
}

/**
 * Load the Google Maps script.
 */
function loadScript(): void {
  console.info("Loading Google Maps script...");
  const script = document.createElement("script");
  script.src =
    "https://maps.google.com/maps/api/js?key=" +
    API_KEY +
    "&libraries=" +
    LIBRARIES;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
  console.info("Script loading finished.");
}

/**
 * Get location by address.
 *
 * @param address
 */
function getLocation(address: string): any | null {
  const geocoder: Geocoder = new google.maps.Geocoder();

  const geocodeRequest = {
    address: address
  };

  let location: any | null = null;

  geocoder.geocode(geocodeRequest, (results: any) => {
    location = results[0].geometry.location;
  });

  return location;
}

/**
 * Create map based on location.
 *
 * @param location
 */
function createMap(location: any): any {
  // eslint-disable-next-line no-undef
  return new google.maps.Map(document.getElementById("map") as HTMLElement, {
    zoom: 15,
    center: location
  });
}

/**
 * Create a marker in the specified map with the specified location.
 *
 * @param map
 * @param location
 */
function setMarker(map: Map, location: any): void {
  // eslint-disable-next-line no-undef
  const marker: Marker = new google.maps.Marker({
    position: location,
    map
  });
}

const googleOptimizePlugin: Plugin = (ctx, inject): void => {
  inject("", null);
};

export default googleOptimizePlugin;
