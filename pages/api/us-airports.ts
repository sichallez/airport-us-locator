import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const URL = `https://airlabs.co/api/v9/airports?country_code=US&api_key=${process.env.API_KEY}`;
  const response = await axios.get(URL);
  res.status(200).json({ data: response.data });
}
