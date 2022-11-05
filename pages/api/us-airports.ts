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
  const URL = `https://airlabs.co/api/v9/airports?iata_code=CDG&api_key=${process.env.API_KEY}`;
  const response = await axios.get(URL);
  res.status(200).json({ data: response.data });
}
