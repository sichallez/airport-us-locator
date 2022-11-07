import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { fetchAllAirportsFromJSON } from "../store";
import MyGoogleMap from "../components/MyGoogleMap";

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // console.log("DATADATADATA???", data);

  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await axios.get("/api/us-airports");
    //   const dt = await res.data;
    //   console.log("DATA:", dt);
    // };
    // fetchData();
    dispatch(fetchAllAirportsFromJSON());
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar />
      {/* <MyGoogleMap /> */}
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
