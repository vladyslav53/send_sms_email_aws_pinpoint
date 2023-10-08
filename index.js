import dotenv from "dotenv";
import sendTxEmail from "./email.js";
import sendTxSMS from "./sms.js";

dotenv.config();

const FROM_ADDRESS = process.env.FROM_ADDRESS;
const PINPOINT_PROJECT_ID = process.env.PINPOINT_PROJECT_ID;
const SENDER_ID = process.env.SENDER_ID;

let message =
    "Hello John, Your order with Ckeva Software for Monday is confirmed. Your order # is 12345.";

sendTxEmail(message, FROM_ADDRESS, "", PINPOINT_PROJECT_ID);

sendTxSMS(message, "", "", SENDER_ID, PINPOINT_PROJECT_ID);
