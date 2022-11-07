import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { calcDistanceNautical } from "../utils";
import MyGoogleMap from "./MyGoogleMap";
import { InputAirport } from "../types";
import { AnyArray } from "immer/dist/internal";

const initialAirport: InputAirport = {
  name: "",
  index: -1,
  latitude: 39,
  longitude: -98,
};

function SearchBar() {
  const airports: any = useSelector((state) => state);
  //   const airportsNoduplicate = airports.filter(
  //     (airport, index) =>
  //       index === airports.findIndex((other) => airport.iata === other.iata)
  //   );
  const airportsNoduplicate = airports.slice(0, 20);
  const airportList = airportsNoduplicate.map((airport: any) =>
    airport.iata_code !== undefined
      ? `(${airport.iata_code}) ${airport.name}`
      : `(${airport.icao_code}) ${airport.name}`
  );
  //   console.log("AIRPORTS:", airportsNoduplicate);

  const [distance, setDistance] = useState(0);
  const [departureAirport, setDepartureAirport] = useState(initialAirport);
  const [arrivalAirport, setArrivalAirport] = useState(initialAirport);

  const handleDpartureChange = (inputText: string) => {
    const index = airportList.indexOf(inputText);

    if (index > -1) {
      const latitude = airports[index].lat;
      const longitude = airports[index].lng;
      setDepartureAirport({ name: inputText, index, latitude, longitude });

      if (arrivalAirport.index > -1) {
        const _distance = calcDistanceNautical(
          latitude,
          longitude,
          arrivalAirport.latitude,
          arrivalAirport.longitude
        );
        setDistance(_distance);
      }
    } else {
      setDepartureAirport({ ...departureAirport });
    }
  };
  const handleArrivalChange = (inputText: string) => {
    const index = airportList.indexOf(inputText);

    if (index > -1) {
      const latitude = airports[index].lat;
      const longitude = airports[index].lng;
      setArrivalAirport({ name: inputText, index, latitude, longitude });

      if (departureAirport.index > -1) {
        const _distance = calcDistanceNautical(
          departureAirport.latitude,
          departureAirport.longitude,
          latitude,
          longitude
        );
        setDistance(_distance);
      }
    } else {
      setArrivalAirport({ ...arrivalAirport });
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box sx={{ width: "100%" }}>
          <Autocomplete
            id="departure-airport"
            options={airportList}
            renderInput={(params) => <TextField {...params} label="From" />}
            onInputChange={(event: any, newValue: string) =>
              handleDpartureChange(newValue)
            }
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Autocomplete
            id="arrival-airport"
            options={airportList}
            renderInput={(params) => <TextField {...params} label="To" />}
            onInputChange={(event: any, newValue: string) =>
              handleArrivalChange(newValue)
            }
          />
        </Box>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <Typography textAlign={"center"} variant="h4" sx={{ m: "2rem" }}>
          <span style={{ backgroundColor: "purple", padding: "10px" }}>
            {distance} nautical miles
          </span>
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <MyGoogleMap departure={departureAirport} arrival={arrivalAirport} />
      </Box>
    </>
  );
}

export default SearchBar;
