import { _delete, _get, _post, _put } from "./users.js";
import { stringify, parse } from "./utils.js";

const handlerMap = {
  "GET /users": _get,
  "POST /users": _post,
};

export const users = async (event) => {
  const _method = event.routeKey;
  const _body = parse(event.body); // body

  console.log({
    event,
  });

  const { result } = await handlerMap[_method](_body);

  return {
    statusCode: 200,
    body: stringify({
      ok: true,
      result,
    }),
  };
};
