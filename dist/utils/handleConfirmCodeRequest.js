"use strict";
// // import { ConfirmCodeRequest } from "../services/apiConfirmCodeRequest.js";
// import { sendCodeRequest, SendCodeRequestResult } from "../services/apiSendCodeRequest.js";
// import { BotContext } from "../types/botContextTypes.js";
// import dotenv from "dotenv"
// dotenv.config()
// const BASE_URL = process.env.API_BASE_URL || "";
// const API_CONFIRM_CODE = process.env.API_CONFIRM_CODE || "";
// const url = `${BASE_URL}/${API_CONFIRM_CODE}`
// export const handleConfirmCodeRequest = async (ctx: BotContext, confirmCode: string, phone: string) => {
//     try {
//         const result: SendCodeRequestResult = await ConfirmCodeRequest(url, confirmCode, phone); // ждем подтверждения кода
//         console.log(result)
//         if (result.success) {
//             await ctx.reply(result.message);
//             console.log(result.message)
//         } else {
//             await ctx.reply(result.message);
//             console.log(result.message)
//         }
//     } catch (error) {
//         console.error("Ошибка в handleConfirmCodeRequest:", error);
//         await ctx.reply("Ошибка выполнения запроса, смотри логи");
//     }
// };
