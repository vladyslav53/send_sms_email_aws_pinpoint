/* 
Purpose:
email.js demonstrates how to send a transactional email message using Amazon Pinpoint.

Inputs (replace in code):
- FROM_ADDRESS
- TO_ADDRESS
- PINPOINT_PROJECT_ID

Running the code:
node email.js
*/

// snippet-start:[pinpoint.javascript.pinpoint_send_email_message_v3]
// Import required AWS SDK clients and commands for Node.js
import { SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import { pinClient } from "./libs/pinClient.js";

/**
 * 
 * @param {*} message 
 * @param {*} fromEmail
 *  The FromAddress must be verified in SES.
 * @param {*} toEmail 
 * @param {*} projectId 
    The Amazon Pinpoint project/application ID to use when you send this message.
    Make sure that the SMS channel is enabled for the project or application
    that you choose.

 */
const sendTxEmail = async (message, fromEmail, toEmail, projectId) => {
    // The subject line of the email.
    let subject = "Order notification";

    // The character encoding for the subject line and message body of the email.
    let charset = "UTF-8";

    // The email body for recipients with non-HTML email clients.
    let body_text = message;

    // The body of the email for recipients whose email clients support HTML content.
    let body_html = `<html>
<head></head>
<body>
  <p>${message}</p>
</body>
</html>`;

    const params = {
        ApplicationId: projectId,
        MessageRequest: {
            Addresses: {
                [toEmail]: {
                    ChannelType: "EMAIL",
                },
            },
            MessageConfiguration: {
                EmailMessage: {
                    FromAddress: fromEmail,
                    SimpleEmail: {
                        Subject: {
                            Charset: charset,
                            Data: subject,
                        },
                        HtmlPart: {
                            Charset: charset,
                            Data: body_html,
                        },
                        TextPart: {
                            Charset: charset,
                            Data: body_text,
                        },
                    },
                },
            },
        },
    };
    try {
        const data = await pinClient.send(new SendMessagesCommand(params));

        const {
            MessageResponse: { Result },
        } = data;

        const recipientResult = Result[toEmail];

        if (recipientResult.StatusCode !== 200) {
            console.error(recipientResult.StatusMessage);
        } else {
            console.log(recipientResult.MessageId);
        }
    } catch (err) {
        console.log(err.message);
    }
};

// snippet-end:[pinpoint.javascript.pinpoint_send_email_message_v3]

export default sendTxEmail;
