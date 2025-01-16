import { Menu } from "@grammyjs/menu";
import { Bot, Keyboard } from "grammy";


const menu = new Menu("share-contact-menu").text(
  "Поделиться номером телефона",
  async (ctx) => {
    const shareContactKeyboard = new Keyboard().requestContact("Отправить контакт").resized().oneTime()
    await ctx.reply("Отправьте ваш контакт", {reply_markup: shareContactKeyboard})
  }
);

export const setupStartCommand = (bot: Bot) => {
  // Подключаем меню
  bot.use(menu);


  bot.command("start", async (ctx) => {
    await ctx.reply("Добро пожаловать в Teledoc!", { reply_markup: menu });
  });

};


