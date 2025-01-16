import { Menu } from "@grammyjs/menu";
import { Keyboard } from "grammy";

export const shareContactKeyboard = new Menu("share-contact-menu").text(
  "Поделиться номером телефона",

  async (ctx) => {
    const shareContactKeyboard = new Keyboard()

      .requestContact("Отправить контакт")

      .resized()

      .oneTime();

    await ctx.reply("Отправьте ваш контакт", {
      reply_markup: shareContactKeyboard,
    });
  }
);