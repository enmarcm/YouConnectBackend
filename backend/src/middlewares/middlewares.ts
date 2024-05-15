import cors from "cors";
import express from "express";
import midNotJson from "./midNotJson";
import midNotFound from "./midNotFound";

export const midJson = () => express.json();

export const midCors = () => cors({ credentials: true, origin: true });

export { midNotJson };

export { midNotFound };
