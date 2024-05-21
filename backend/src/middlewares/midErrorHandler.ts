import { Request, Response, NextFunction } from "express";
import { ERROR_HANDLERS } from "../constants";

export default function midErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err.name);

  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;

  handler(res, err);
}
