import React from "react";
import {
  Marker,
  Polyline,
  GoogleMap,
  // InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const defaultCenter = { lat: 39, lng: -98 };
const path = [
  { lat: 41.978367, lng: -87.904712 },
  { lat: 40.640655, lng: -73.781937 },
];
const containerStyle = {
  width: "100%",
  height: "800px",
};

const iconURL = "https://www.google.com/mapfiles/kml/paddle/";
const departureIcon = "A.png";
const arrivalIcon = "B.png";

function MyGoogleMap() {
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
        // mapTypeId: "satellite",
      }}
    >
      <Polyline
        path={path}
        options={{
          geodesic: true,
          strokeColor: "#008ECC",
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
          // fillColor: "#FF0000",
          // fillOpacity: 0.35,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
          radius: 30000,
          zIndex: 1,
        }}
      />
      <Marker
        position={path[1]}
        // onLoad={(marker) => {
        //   const customIcon = (opts) =>
        //     Object.assign(
        //       {
        //         path: "M7.8,1.3L7.8,1.3C6-0.4,3.1-0.4,1.3,1.3c-1.8,1.7-1.8,4.6-0.1,6.3c0,0,0,0,0.1,0.1 l3.2,3.2l3.2-3.2C9.6,6,9.6,3.2,7.8,1.3C7.9,1.4,7.9,1.4,7.8,1.3z M4.6,5.8c-0.7,0-1.3-0.6-1.3-1.4c0-0.7,0.6-1.3,1.4-1.3 c0.7,0,1.3,0.6,1.3,1.3 C5.9,5.3,5.3,5.9,4.6,5.8z",
        //         fillColor: "#f00",
        //         fillOpacity: 1,
        //         strokeColor: "#000",
        //         strokeWeight: 1,
        //         scale: 3.5,
        //       },
        //       opts
        //     );

        //   marker.setIcon(
        //     customIcon({
        //       fillColor: "green",
        //       strokeColor: "white",
        //     })
        //   );
        //   // return markerLoadHandler(marker, place);
        // }}
        icon={{
          url: "https://www.google.com/mapfiles/kml/paddle/A.png",
          scaledSize: { height: 48, width: 48 },
          anchor: new google.maps.Point(8, 8),
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default MyGoogleMap;
