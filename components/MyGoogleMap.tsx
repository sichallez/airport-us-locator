import React from "react";
import {
  Marker,
  Polyline,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { InputAirport } from "../types";

const defaultCenter = { lat: 39, lng: -98 };

const containerStyle = {
  width: "100%",
  height: "70vh",
};

const iconURL = "https://www.google.com/mapfiles/kml/paddle/";
const departureIcon = "A.png";
const arrivalIcon = "B.png";

function MyGoogleMap({
  departure,
  arrival,
}: {
  departure: InputAirport;
  arrival: InputAirport;
}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`,
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={4.5}
      options={{
        streetViewControl: false,
      }}
    >
      {departure.name !== "" ? (
        <Marker
          position={{ lat: departure.latitude, lng: departure.longitude }}
          icon={{
            url: iconURL + departureIcon,
            scaledSize: new google.maps.Size(48, 48),
            anchor: new google.maps.Point(8, 8),
          }}
        />
      ) : (
        <></>
      )}
      {arrival.name !== "" && departure.name !== "" && (
        <>
          <Polyline
            path={[
              { lat: departure.latitude, lng: departure.longitude },
              { lat: arrival.latitude, lng: arrival.longitude },
            ]}
            options={{
              geodesic: true,
              strokeColor: "#bf521f",
              strokeOpacity: 0,
              strokeWeight: 2,
              icons: [
                {
                  icon: {
                    path: "M 0,0 0,1",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                    scale: 3,
                  },
                  repeat: "10px",
                },
              ],
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              zIndex: 1,
            }}
          />
          <Marker
            position={{ lat: arrival.latitude, lng: arrival.longitude }}
            icon={{
              url: iconURL + arrivalIcon,
              scaledSize: new google.maps.Size(48, 48),
              anchor: new google.maps.Point(8, 8),
            }}
          />
        </>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MyGoogleMap;
