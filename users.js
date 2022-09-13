import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import { stringify, parse } from "./utils.js";

const request_url = `${process.env.DB_URL}/db/users`;

const noBodyMethods = ["get", "delete"];

const forceDeleteField = process.env.FORCE_DELETE_FIELD;

const _request = async ({
  method = "get",
  body = {},
  url = request_url,
} = {}) => {
  const _options = noBodyMethods.includes(method)
    ? {
        headers: { "Content-Type": "application/json" },
        method,
      }
    : {
        headers: { "Content-Type": "application/json" },
        method,
        body: stringify(body),
      };

  console.log({
    url,
    _options,
  });

  const response = await fetch(url, _options);

  return await response.json();
};

const _post = async ({ body: payload }) => {
  const id = uuidv4();
  return _request({
    url: `${request_url}/${id}`,
    method: "post",
    body: {
      id,
      ...payload,
    },
  });
};

const _delete = async ({ id }) => {
  return _request({
    url: `${request_url}/${id}?${forceDeleteField}=true`,
    method: "delete",
  });
};

const _put = (payload) => {};

const _get = async () => {
  return _request();
};

export { _delete, _get, _post, _put };
