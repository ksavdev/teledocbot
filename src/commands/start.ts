import { Bot } from "grammy";


import { type BotContext } from "../types/botContextTypes.js";
export const setupStartCommand = (bot: Bot<BotContext>) => {
    // Подключаем меню
    
  
    bot.command("start", async (ctx) => {
        await ctx.conversation.enter("authentication");
    });
  
  };