import { sendCodeRequest, SendCodeRequestResult } from "../services/apiSendCodeRequest.js";
import { BotContext } from "../types/botContextTypes.js";
import dotenv from "dotenv"
dotenv.config()

const BASE_URL = process.env.API_BASE_URL || "";
const API_SEND_CODE = process.env.API_SEND_CODE || "";
const url = `${BASE_URL}/${API_SEND_CODE}`

export const handleSendCodeRequest = async (ctx: BotContext, phoneNumber: string) => {
    const result: SendCodeRequestResult = await sendCodeRequest(url, phoneNumber);

    if (result.success) {
        await ctx.reply(result.message);
    } else {
        await ctx.reply(result.message);
        
    }
};