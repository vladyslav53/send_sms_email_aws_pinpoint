import dotenv from "dotenv";
import sendTxEmail from "./email.js";
import sendTxSMS from "./sms.js";

dotenv.config();

const PINPOINT_PROJECT_ID = process.env.PINPOINT_PROJECT_ID;
const SENDER_ID = process.env.SENDER_ID;

const FROM_ADDRESS_EMAIL = process.env.FROM_ADDRESS_EMAIL;
const FROM_ADRESS_PHONE = process.env.FROM_ADRESS_PHONE;

const TO_ADDRESS_EMAIL = process.env.TO_ADDRESS_EMAIL;
const TO_ADDRESS_PHONE = process.env.TO_ADDRESS_PHONE;

let message =
    "Hello John, Your order with Ckeva Software for Monday is confirmed. Your order # is 12345.";

sendTxEmail(message, FROM_ADDRESS_EMAIL, TO_ADDRESS_EMAIL, PINPOINT_PROJECT_ID);
sendTxSMS(
    message,
    FROM_ADRESS_PHONE,
    TO_ADDRESS_PHONE,
    SENDER_ID,
    PINPOINT_PROJECT_ID
);
