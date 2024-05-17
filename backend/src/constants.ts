import "dotenv/config";
import { Response } from "express";
import { ErrorHandler, HostConfig } from "./types";

export const PORT = Number(process.env.PORT) || 3000;

export const Hosts: Record<string, HostConfig> = {
  gmail: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  },
  outlook: {
    host: "smtp.office365.com",
    port: 587,
    secure: false,
  },
};

export const ERROR_HANDLERS: Record<string, ErrorHandler> = {
  CastError: (res: Response) => res.status(400).json({ error: "Malformatted ID" }),
  ValidationError: (res: Response) => res.status(409).json({ error: "Validation error" }),
  JsonWebTokenError: (res: Response) => res.status(401).json({ error: "Invalid token" }),
  TokenExpiredError: (res: Response) => res.status(401).json({ error: "Expired token" }),
  defaultError: (res: Response) => res.status(500).json({ error: "Something went wrong" }),
};