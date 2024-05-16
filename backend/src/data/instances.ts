import "dotenv/config";
import TSGooseHandler from "../components/TSGooseHandler";
import MailerConfigJson from "./jsons/mailerConfig.json";
import Mailer from "../components/Mailer";
import { MailerConfig } from "../types";

const connectionString = process.env.ConnectionString as string | "";

export const ITSGooseHandler = new TSGooseHandler({ connectionString });

export const INodeMailer = new Mailer({
  config: MailerConfigJson as MailerConfig,
});
