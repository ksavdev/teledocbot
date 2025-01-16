import {confirmInlineKeyboard} from "../keyboards/inlineKeyboards/confirmKeyboard.js";
import {shareContactKeyboard } from "../keyboards/shareContact.js";
import {type BotContext, type BotConversation} from "../types/botContextTypes.js";
export async function authentication(conversation: BotConversation, ctx: BotContext) {
    // Показываем меню для отправки контакта
  
    await ctx.reply("Добро пожаловать в Teledoc!", {
      reply_markup: shareContactKeyboard,
    }); // Ждём, пока пользователь отправит контакт
  
    const contactMessage = await conversation.waitFor("message:contact");
  
    if (!contactMessage.message?.contact?.phone_number) {
      await ctx.reply("Не удалось получить номер телефона. Попробуйте снова.");
  
      return;
    }
  
    const userPhoneNumber = contactMessage.message.contact.phone_number; 
  
    await ctx.reply(`Это ваш номер? ${userPhoneNumber} `, {
      reply_markup: confirmInlineKeyboard,
    });
  
    const answerResponse = (await conversation.waitFor(
      "callback_query:data"
    )) as { callbackQuery: { id: string; data: string } };
  
    await ctx.api.answerCallbackQuery(answerResponse.callbackQuery.id);
  
    if (answerResponse.callbackQuery.data === "true") {
      await ctx.reply("Спасибо, вы успешно авторизовались");
    } else {
      await ctx.reply(
        "Пожалуйста, отправьте ваш номер телефона в следующем сообщении"
      );
  
      const textMessage = await conversation.waitFor("message:text");
  
      const manualPhoneNumber = textMessage.message?.text;
  
      await ctx.reply(
        `Спасибо, вы успешно авторизовались. Ваш номер: ${manualPhoneNumber}`
      );
    }
  }