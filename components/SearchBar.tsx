import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { calcDistanceNautical } from "../utils";
import MyGoogleMap from "./MyGoogleMap";
import { InputAirport } from "../types";
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "purple",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "black",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#5C848E",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF6D28",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF6D28",
      borderWidth: "3px",
    },
  },
});

const initialAirport: InputAirport = {
  name: "",
  index: -1,
  latitude: 39,
  longitude: -98,
};

function SearchBar() {
  const airports: any = useSelector((state) => state);

  console.log("AIRPORTS:", airports);

  // filter out the duplicate data from the API call (where some airports have the same iata value)
  const airportsNoduplicate = airports.reduce((prev: any, cur: any) => {
    if (
      !prev.some(function (el: any) {
        return el.iata_code === cur.iata_code;
      })
    )
      prev.push(cur);
    return prev;
  }, []);
  // const airportsNoduplicate = airports.slice(0, 20);
  // console.log("AIRPORTS:", airportsNoduplicate);

  const airportList = airportsNoduplicate.map((airport: any) =>
    airport.iata_code !== undefined
      ? `(${airport.iata_code}) ${airport.name}`
      : `(${airport.icao_code}) ${airport.name}`
  );

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
      {/* <Stack direction="row" spacing={2}> */}
      <Grid
        container
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <StyledAutocomplete
            id="departure-airport"
            options={airportList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="From"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 18, color: "black", fontWeight: "600" },
                }}
              />
            )}
            onInputChange={(event: any, newValue: string) =>
              handleDpartureChange(newValue)
            }
          />
        </Grid>
        <Grid item xs={6}>
          <StyledAutocomplete
            id="arrival-airport"
            options={airportList}
            renderInput={(params) => (
              <TextField
                {...params}
                label="To"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: 18, color: "black", fontWeight: "600" },
                }}
              />
            )}
            onInputChange={(event: any, newValue: string) =>
              handleArrivalChange(newValue)
            }
          />
        </Grid>
        {/* </Stack> */}
      </Grid>
      <Box sx={{ width: "100%" }}>
        <Typography textAlign={"center"} variant="h4" sx={{ m: "2rem" }}>
          <span
            style={{
              backgroundColor: "#6F38C5",
              borderRadius: "10px",
              padding: "10px 30px",
              color: "white",
            }}
          >
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
