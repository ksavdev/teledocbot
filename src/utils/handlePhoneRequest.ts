import { sendPhoneRequest, PhoneRequestResult } from "../services/apiPhoneRequest.js";
import { BotContext } from "../types/botContextTypes.js";

export const handlePhoneRequest = async (ctx: BotContext, phoneNumber: string) => {
    const result: PhoneRequestResult = await sendPhoneRequest('http://localhost:3002/api/v1/auth/doctor/telegram', phoneNumber);

    if (result.success) {
        await ctx.reply(result.message);
    } else {
        await ctx.reply(result.message);
        
    }
};