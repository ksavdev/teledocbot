import { confirmInlineKeyboard } from "../keyboards/inlineKeyboards/confirmKeyboard.js";
import { shareContactKeyboard } from "../keyboards/shareContact.js";
import { checkRoleByPhone } from "../services/apiCheckRoleByPhone.js";
import { confirmCode } from "../services/apiConfirmCode.js";
import { sendCode } from "../services/apiSendCode.js";
import {
  type BotContext,
  type BotConversation,
} from "../types/botContextTypes.js";

export async function authentication(
  conversation: BotConversation,
  ctx: BotContext
) {
  await ctx.reply("Добро пожаловать в Teledoc!", {
    reply_markup: shareContactKeyboard,
  });

  const contactMessage = await conversation.waitFor("message:contact");

  if (!contactMessage.message?.contact?.phone_number) {
    await ctx.reply("Не удалось получить номер телефона. Попробуйте снова.");
    return;
  }

  const userPhoneNumber = contactMessage.message.contact.phone_number;

  await ctx.reply(`Это ваш номер? ${userPhoneNumber} `, {
    reply_markup: confirmInlineKeyboard,
  });


  const answerResponse = await conversation.waitFor("callback_query:data");
  await ctx.api.answerCallbackQuery(answerResponse.callbackQuery.id);

  if (answerResponse.callbackQuery.data === "true") {

    const roleResult = await conversation.external(() => checkRoleByPhone(userPhoneNumber));

    if (typeof roleResult === "string") {
      await ctx.reply(roleResult);
      return;
    }

    await ctx.reply(`Роль подтверждена: ${JSON.stringify(roleResult)}`);


    console.log("Отправляем код в WhatsApp");
    const sendCodeResult = await conversation.external(() => sendCode(userPhoneNumber));

    if (typeof sendCodeResult === "string") {
      await ctx.reply(sendCodeResult);
      return;
    }

    await ctx.reply("Введите код подтверждения, отправленный в WhatsApp");


    console.log("ждем ввода кода от пользователя");
    const textMessageWithCode = await conversation.waitFor("message:text");
    const code = Number(textMessageWithCode.message?.text);


    console.log("проверяем код");
    const confirmCodeResult = await conversation.external(() => confirmCode(userPhoneNumber, code));

    if (typeof confirmCodeResult === "string") {
      await ctx.reply(confirmCodeResult);
      return;
    }

    await ctx.reply(`Подтверждение успешно: ${JSON.stringify(confirmCodeResult)}`);


    console.log("Повторная проверка роли пользователя");
    const finalRoleCheck = await conversation.external(() => checkRoleByPhone(userPhoneNumber));

    if (typeof finalRoleCheck === "string") {
      await ctx.reply(`Ошибка при проверке роли: ${finalRoleCheck}`);
      return;
    }

    await ctx.reply(`Окончательная роль пользователя: ${JSON.stringify(finalRoleCheck)}`);

    return;
  }


  await ctx.reply("Пожалуйста, отправьте ваш номер телефона в сообщении");

  console.log("Запрашиваем номер у пользователя в сообщении");
  const textMessageWithNumber = await conversation.waitFor("message:text");
  const manualPhoneNumber = textMessageWithNumber.message?.text.trim();

  console.log("Отправляем код в WhatsApp");
  const sendCodeResult = await conversation.external(() => sendCode(manualPhoneNumber));

  if (typeof sendCodeResult === "string") {
    await ctx.reply(sendCodeResult);
    return;
  }

  await ctx.reply("Введите код подтверждения, отправленный в WhatsApp");

  console.log("ждем ввода кода от пользователя");
  const textMessageWithCode = await conversation.waitFor("message:text");
  const code = Number(textMessageWithCode.message?.text);

  console.log("проверяем код");
  const confirmCodeResult = await conversation.external(() => confirmCode(manualPhoneNumber, code));

  if (typeof confirmCodeResult === "string") {
    await ctx.reply(confirmCodeResult);
    return;
  }

  


  console.log("Повторная проверка роли пользователя");
  const finalRoleCheck = await conversation.external(() => checkRoleByPhone(manualPhoneNumber));

  if (typeof finalRoleCheck === "string") {
    await ctx.reply(finalRoleCheck);
    return;
  }

  await ctx.reply(finalRoleCheck);
}
