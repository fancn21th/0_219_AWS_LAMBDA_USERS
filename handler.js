import { _delete, _get, _post, _put } from "./users.js";
import { stringify, parse } from "./utils.js";

const handlerMap = {
  "GET /users": _get,
  "POST /users": _post,
  "DELETE /users/{id}": _delete,
};

export const users = async (event) => {
  const _method = event.routeKey;
  const _body = parse(event.body); // body
  const { id } = event.pathParameters || { id: undefined };

  const handler = handlerMap[_method];

  console.log({
    _method,
    _body,
    id,
  });

  const result = await handler({
    id,
    body: _body,
  });

  return {
    statusCode: 200,
    body: stringify({
      ok: true,
      result,
    }),
  };
};
