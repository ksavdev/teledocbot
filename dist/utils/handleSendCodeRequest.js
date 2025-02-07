"use strict";
// import { sendCodeRequest, SendCodeRequestResult } from "../services/apiSendCodeRequest.js";
// import { BotContext, BotConversation } from "../types/botContextTypes.js";
// import dotenv from "dotenv"
// import { handleConfirmCodeRequest } from "./handleConfirmCodeRequest.js";
// dotenv.config()
// const BASE_URL = process.env.API_BASE_URL || "";
// const API_SEND_CODE = process.env.API_SEND_CODE || "";
// const url = `${BASE_URL}/${API_SEND_CODE}`
// export const handleSendCodeRequest = async (ctx: BotContext, phoneNumber: string, conversation: BotConversation) => {
//     try {
//         const result: SendCodeRequestResult = await sendCodeRequest(url, phoneNumber); // ждем выполнения SendCodeRequest
//         console.log(result)
//         if (result.success) {
//             await ctx.reply(
//                 "Пожалуйста, введите код подтверждения отправленый в WhatsApp"
//             );
//             const textMessage = await conversation.waitFor("message:text");
//             console.log(textMessage)
//             const confirmCode = String(textMessage.message?.text).trim();
//             console.log(confirmCode)
//             await handleConfirmCodeRequest(ctx, confirmCode, phoneNumber); // Ожидание выполнения handleConfirmCodeRequest
//             await ctx.reply(result.message);
//             console.log(result.message)
//         } else {
//             await ctx.reply(result.message);
//             console.log(result.message)
//         }
//     } catch (error) {
//         console.error("Ошибка в handlePhoneRequest:", error);
//         await ctx.reply("Ошибка выполнения запроса, смотри логи");
//     }
// };
