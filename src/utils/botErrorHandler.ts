import { Bot } from "grammy";
import { GrammyError, HttpError } from "grammy";
import { BotContext } from "../types/botContextTypes";

export const botErrorHandler = (bot: Bot<BotContext>) => {
  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке update: ${ctx.update.update_id}`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Проблема с подключением к Telegram:", e);
    } else {
      console.error("Неизвестная ошибка:", e);
    }
  });
};
