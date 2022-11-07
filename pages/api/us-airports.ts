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
  const URL = `https://airlabs.co/api/v9/airports?country_code=US&api_key=${process.env.API_KEY}`;
  // const URL = "https://www.airport-data.com/api/ap_info.json?country_code=US";               // airport-data.com free API, only support look up for IATA or ICAO
  // const URL = `https://airportdb.io/api/v1/airport/KJFK?apiToken=${process.env.API_TOKEN}`; // airportdb.io free API, only support ICAO search
  // const URL =
  //   "https://api.duffel.com/air/airports?iata_country_code=GB&accessduffel_test_tbmG0Ww5a_WGPgDhDkaIwiJKn9Y_bQe33DCRwNWUoHL";
  const response = await axios.get(URL);
  res.status(200).json({ data: response.data });
}
