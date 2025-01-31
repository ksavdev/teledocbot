import { sendPhoneRequest, PhoneRequestResult } from "../services/apiPhoneRequest.js";
import { handleSendCodeRequest } from "./handleSendCodeRequest.js";
import { BotContext } from "../types/botContextTypes.js";
import dotenv from "dotenv"
dotenv.config()

const BASE_URL = process.env.API_BASE_URL || "";
const API_SEND_CODE = process.env.API_SEND_CODE || "";
const url = `${BASE_URL}/${API_SEND_CODE}`

export const handlePhoneRequest = async (ctx: BotContext, phoneNumber: string) => {
    try {
        await handleSendCodeRequest(ctx, phoneNumber); // Ожидание выполнения handleSendCodeRequest
        const result: PhoneRequestResult = await sendPhoneRequest(url, phoneNumber);
        if (result.success) {
            await ctx.reply(result.message);
        } else {
            await ctx.reply(result.message);
        }
    } catch (error) {
        console.error("Ошибка в handlePhoneRequest:", error);
        await ctx.reply("Ошибка выполнения запроса, смотри логи");
    }
}