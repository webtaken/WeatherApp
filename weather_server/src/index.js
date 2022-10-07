import { createBot } from 'whatsapp-cloud-api';
// or if using require:
// const { createBot } = require('whatsapp-cloud-api');

(async () => {
  try {
    // replace the values below
    const from = 'YOUR_WHATSAPP_PHONE_NUMBER_ID';
    const token = 'YOUR_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN';
    const to = 'PHONE_NUMBER_OF_RECIPIENT';
    const webhookVerifyToken = 'YOUR_WEBHOOK_VERIFICATION_TOKEN';

    // Create a bot that can send messages
    const bot = createBot(from, token);

    // Send text message
    const result = await bot.sendText(to, 'Hello world');

    // Start express server to listen for incoming messages
    // NOTE: See below under `Documentation/Tutorial` to learn how
    // you can verify the webhook URL and make the server publicly available
    await bot.startExpressServer({
      webhookVerifyToken,
    });

    // Listen to ALL incoming messages
    // NOTE: remember to always run: await bot.startExpressServer() first
    bot.on('message', async (msg) => {
      console.log(msg);

      if (msg.type === 'text') {
        await bot.sendText(msg.from, 'Received your text message!');
      } else if (msg.type === 'image') {
        await bot.sendText(msg.from, 'Received your image!');
      }
    });
  } catch (err) {
    console.log(err);
  }
})();