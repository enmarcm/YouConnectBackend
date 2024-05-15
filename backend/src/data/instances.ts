import "dotenv/config";
import TSGooseHandler from "../components/TSGooseHandler";

const connectionString = process.env.ConnectionString as string | "";

export const ITSGooseHandler = new TSGooseHandler({ connectionString });
