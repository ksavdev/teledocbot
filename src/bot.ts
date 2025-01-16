import dotenv from "dotenv";
dotenv.config();
import { Bot } from "grammy";
import { setupStartCommand } from "./commands/start.js"; // Импорт команды /start

const bot = new Bot(process.env.BOT_API_KEY || "");

setupStartCommand(bot);

// Запускаем бота
bot.start();


