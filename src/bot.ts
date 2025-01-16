import dotenv from "dotenv";

dotenv.config();

import { Bot, session } from "grammy";

import { conversations, createConversation } from "@grammyjs/conversations";

import { shareContactKeyboard } from "./keyboards/shareContact.js";
import { type BotContext } from "./types/botContextTypes.js";
import { authentication } from "./conversations/auth.js";
import { setupStartCommand } from "./commands/start.js";
import { botErrorHandler } from "./utils/botErrorHandler.js";

const bot = new Bot<BotContext>(process.env.BOT_API_KEY || "");

bot.use(session({ initial: () => ({}) }));

bot.use(conversations());

bot.use(shareContactKeyboard);

bot.use(createConversation(authentication));

setupStartCommand(bot);

botErrorHandler(bot);

bot.start();
