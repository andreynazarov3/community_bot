//===========================
//
// APP CONFIGS
//
//===========================

// read .env file
require('dotenv').config();

// telegraf framework initialize
const Telegraf = require('telegraf');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');

//===========================
//
// BOT CONFIGURE
//
//===========================

// create bot instance
const app = new Telegraf(process.env.BOT_TOKEN);

// set up scenes
const stage = new Stage([]);

// connect middlewares
app.use(session());
app.use(stage.middleware());
app.use(Telegraf.log());

//===========================
//
// BOT START ACTION
//
//===========================

app.start(({ from, message }) => {});

//===========================
//
// BOT COMMANDS
//
//===========================

//===========================
//
// BOT ACTIONS IN BASE SCENE (ROOM or OUTSIDE)
//
//===========================

//===========================
//
// BOT START!
//
//===========================

// set up webhook and start
(async () => {
  try {
    let webhookUrl;
    let hookPath;
    let host = null;
    const port = process.env.PORT || 5000;
    // use ngrok for local dev
    if (process.env.MODE === 'development') {
      const ngrok = require('ngrok');
      webhookUrl = await ngrok.connect(5000);
      hookPath = '/';
      host = 'localhost';
    } else {
      webhookUrl = process.env.WEBHOOK_URL;
      hookPath = '/webhook';
    }
    const result = await app.telegram.setWebhook(webhookUrl);
    console.log('set webhook success: ' + result);
    app.startWebhook(hookPath, null, port, host);
    console.log('bot started on port: ', port);
  } catch (e) {
    console.log('set webhook error: ' + e);
  }
})();
