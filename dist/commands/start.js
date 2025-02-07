export const setupStartCommand = (bot) => {
    bot.command("start", async (ctx) => {
        await ctx.conversation.enter("authentication");
    });
};
