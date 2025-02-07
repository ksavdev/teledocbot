"use strict";
// import { sendPhoneRequest, PhoneRequestResult } from "../services/apiPhoneRequest.js";
// import { handleSendCodeRequest } from "./handleSendCodeRequest.js";
// import { BotContext, BotConversation } from "../types/botContextTypes.js";
// import dotenv from "dotenv"
// dotenv.config()
// const BASE_URL = process.env.API_BASE_URL || "";
// const API_SEND_CODE = process.env.API_SEND_CODE || "";
// const url = `${BASE_URL}/${API_SEND_CODE}`
// export const handlePhoneRequest = async (ctx: BotContext, phoneNumber: string, conversation: BotConversation) => {
//     try {
//         console.log("Ожидание выполнения handleSendCodeRequest")
//         await handleSendCodeRequest(ctx, phoneNumber, conversation); // Ожидание выполнения handleSendCodeRequest 
//         const result: PhoneRequestResult = await sendPhoneRequest(url, phoneNumber);
//         console.log(result)
//         if (result.success) {
//             await ctx.reply(result.message);
//             console.log(result.message)
//             if (!result.success) {
//                 await ctx.reply("Ошибка отправки запроса на телефон.");
//                 return;
//             }
//         } else {
//             await ctx.reply(result.message);
//         }
//     } catch (error) {
//         console.error("Ошибка в handlePhoneRequest:", error);
//         await ctx.reply("Ошибка выполнения запроса, смотри логи");
//     }
// }
