import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import {
  fetchAllAirportsFromJSON,
  AppDispatch,
  fetchAllAirports,
} from "../store";
import MyGoogleMap from "../components/MyGoogleMap";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();
  // const dispatch = useAppDispatch();

  const [showPopup, setShowPopup] = useState(false);

  // console.log("DATADATADATA???", data);

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await axios.get("/api/us-airports");
    //   const dt = await res.data;
    //   console.log("DATA:", dt);
    // };
    // fetchData();
    dispatch(fetchAllAirportsFromJSON());
    // dispatch(fetchAllAirports());
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ mb: "1rem", maxWidth: "1200px" }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton aria-label="help" size="large" onClick={handleClickOpen}>
            <HelpIcon sx={{ color: "#00a698" }} />
            <Typography variant="h6" component="div">
              About
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"About this App"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            This App is used to calculate the distance (in Nautical Miles)
            between any two Airports in United State. The airports can be
            searched either via Name or their 3-letter IATA code. The search
            will be visually shown on the Google Map plugin. The flight
            trajectory will be drawn via simple polyline. <br />
            <br /> This App is build with Next.js, React, MUI v5, Redux, Google
            Map API, AirLabs API.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Paper
        sx={{
          maxWidth: "lg",
          margin: "auto",
          width: "100%",
          padding: "25px",
        }}
      >
        <SearchBar />
      </Paper>
      {/* <MyGoogleMap /> */}
      <footer className={styles.footer}>
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Grid item>
            <span style={{ fontSize: "16px" }}> Build with</span>
          </Grid>
          <Grid item>
            <Image
              src="/Nextjs-logo.svg"
              alt="Nextjs Logo"
              width={40}
              height={40}
            />
          </Grid>
          <Grid item>
            <Image
              src="/React-icon.svg"
              alt="React Logo"
              width={40}
              height={20}
            />
          </Grid>
          <Grid item>
            <Image
              src="/material-ui.svg"
              alt="MUI Logo"
              width={30}
              height={20}
            />
          </Grid>
          <Grid item>
            <Image
              src="/Google_Maps_Logo_2020.svg"
              alt="GoogleMaps Logo"
              width={30}
              height={30}
            />
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
