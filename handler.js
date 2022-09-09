import fetch from "node-fetch";
import { stringify, parse } from "./utils.js";

const request_url = `${process.env.DB_URL}/db/users`;

export const users = async (event) => {
  const response = await fetch(request_url, {
    headers: { "Content-Type": "application/json" },
    method: "get",
  });

  const { result } = await response.json();

  return {
    statusCode: 200,
    body: stringify({
      ok: true,
      result,
    }),
  };
};
