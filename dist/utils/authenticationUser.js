import dotenv from "dotenv";
dotenv.config();
import { sendCodeRequest } from "../services/apiSendCodeRequest.js";
import { confirmCodeRequest } from "../services/apiConfirmCodeRequest.js";
const BASE_URL = process.env.API_BASE_URL || "";
const API_SEND_CODE = process.env.API_SEND_CODE || "";
const API_CONFIRM_CODE = process.env.API_CONFIRM_CODE || "";
export async function authenticationUser(ctx, conversation, userPhone) {
    // Проверяем, был ли уже отправлен код
    const sendCodeResult = await sendCodeRequest(`${BASE_URL}/${API_SEND_CODE}`, userPhone);
    if (sendCodeResult.success) {
        await ctx.reply("Введите код, отправленный в WhatsApp");
        // Ожидаем, пока пользователь введет код
        const textMessage = await conversation.waitFor("message:text");
        const confirmCode = textMessage.message?.text.trim();
        // Если код пустой или неверный, завершаем процесс
        if (!confirmCode) {
            await ctx.reply("Вы не ввели код. Попробуйте снова.");
            return;
        }
        // Подтверждаем код
        const confirmCodeResult = await confirmCodeRequest(`${BASE_URL}/${API_CONFIRM_CODE}`, confirmCode, userPhone);
        // Ответ на результат
        if (confirmCodeResult.success) {
            await ctx.reply("Код подтвержден. Вы успешно авторизованы.");
        }
        else {
            await ctx.reply(confirmCodeResult.message); // Сообщение об ошибке
        }
    }
    else {
        await ctx.reply(sendCodeResult.message); // Сообщаем об ошибке, если код не был отправлен
    }
}
