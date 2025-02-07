import { confirmInlineKeyboard } from "../keyboards/inlineKeyboards/confirmKeyboard.js";
import { shareContactKeyboard } from "../keyboards/shareContact.js";
import { checkRoleByPhone } from "../services/apiCheckRoleByPhone.js";
import { confirmCode } from "../services/apiConfirmCode.js";
import { sendCode } from "../services/apiSendCode.js";
export async function authentication(conversation, ctx) {
    try {
        console.info("Начало аутентификации...");
        await ctx.reply("Добро пожаловать в Teledoc!", {
            reply_markup: shareContactKeyboard,
        });
        console.info("Ожидание номера телефона...");
        const contactMessage = await conversation.waitFor("message:contact");
        if (!contactMessage.message?.contact?.phone_number) {
            console.warn("Не удалось получить номер телефона.");
            await ctx.reply("Не удалось получить номер телефона. Попробуйте снова.");
            return;
        }
        const userPhoneNumber = contactMessage.message.contact.phone_number;
        console.info(`Получен номер телефона: ${userPhoneNumber}`);
        await ctx.reply(`Это ваш номер? ${userPhoneNumber} `, {
            reply_markup: confirmInlineKeyboard,
        });
        console.info("Ожидание подтверждения номера...");
        const answerResponse = await conversation.waitFor("callback_query:data");
        await ctx.api.answerCallbackQuery(answerResponse.callbackQuery.id);
        if (answerResponse.callbackQuery.data === "true") {
            console.info("Номер телефона подтвержден пользователем.");
            console.info("Проверка роли пользователя...");
            const roleResult = await conversation.external(() => checkRoleByPhone(userPhoneNumber));
            if (typeof roleResult === "string") {
                console.warn(`Ошибка проверки роли: ${roleResult}`);
                await ctx.reply(roleResult);
                return;
            }
            console.info("Роль пользователя подтверждена. Авторизация успешна.");
            await ctx.reply(`Вы авторизовались`);
            return;
        }
        console.info("Пользователь не подтвердил номер. Запрос нового номера...");
        await ctx.reply("Пожалуйста, отправьте ваш номер телефона в сообщении");
        const textMessageWithNumber = await conversation.waitFor("message:text");
        const manualPhoneNumber = textMessageWithNumber.message?.text.trim();
        console.info(`Получен номер телефона вручную: ${manualPhoneNumber}`);
        await ctx.reply("Отправляем запрос на сервер...");
        const sendCodeResult = await conversation.external(() => sendCode(manualPhoneNumber));
        if (typeof sendCodeResult === "string") {
            console.warn(`Ошибка отправки кода: ${sendCodeResult}`);
            await ctx.reply(sendCodeResult);
            return;
        }
        console.info("Код отправлен пользователю. Ожидание кода подтверждения...");
        await ctx.reply("Введите код подтверждения, отправленный в WhatsApp");
        const textMessageWithCode = await conversation.waitFor("message:text");
        const code = Number(textMessageWithCode.message?.text);
        console.info(`Получен код подтверждения: ${code}`);
        await ctx.reply("Проверяем код...");
        const confirmCodeResult = await conversation.external(() => confirmCode(manualPhoneNumber, code));
        if (typeof confirmCodeResult === "string") {
            console.warn(`Ошибка подтверждения кода: ${confirmCodeResult}`);
            await ctx.reply(confirmCodeResult);
            return;
        }
        console.info("Код подтвержден. Проверяем роль пользователя...");
        const finalRoleCheck = await conversation.external(() => checkRoleByPhone(manualPhoneNumber));
        if (typeof finalRoleCheck === "string") {
            console.warn(`Ошибка проверки роли: ${finalRoleCheck}`);
            await ctx.reply("Доступ закрыт. Вы не доктор"); // Возможно, стоит заменить на более корректное сообщение
            return;
        }
        console.info("Роль пользователя подтверждена. Авторизация успешна.");
        await ctx.reply(`Вы авторизовались`);
    }
    catch (error) {
        console.error("Ошибка в процессе аутентификации:", error);
        await ctx.reply("Произошла ошибка. Попробуйте позже.");
    }
}
