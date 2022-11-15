import axios from "axios";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // const URL = `https://airlabs.co/api/v9/airports?country_code=US&api_key=${process.env.API_KEY}`;
  // const URL = "https://www.airport-data.com/api/ap_info.json?country_code=US"; // airport-data.com free API, only support look up for IATA or ICAO
  // const URL = `https://airportdb.io/api/v1/airport/KJFK?apiToken=${process.env.API_TOKEN}`; // airportdb.io free API, only support ICAO search
  // const URL = "https://api.duffel.com/air/airports?iata_country_code=GB"; // Duffelapi seems error..
  const URL = "https://api.api-ninjas.com/v1/airports?country=US&offset=3000"; // api ninjas only return 30 results, offset doesn't work
  // const URL = "https://travel-hacking-tool.p.rapidapi.com/api/listairports/"; // RapidAPI
  // const response = await axios.get(URL); // general axios GET
  // for API NINJAS or RapidAPI
  const response = await axios.get(URL, {
    headers: {
      "X-Api-Key": process.env.X_API_KEY,
      // "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
      // "X-RapidAPI-Host": "travel-hacking-tool.p.rapidapi.com",
    },
  });
  // for Duffel api
  // const response = await axios.get(URL, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  //   },
  // });
  console.log("RESPONSE:", response);
  res.status(200).json({ data: response.data });
}
