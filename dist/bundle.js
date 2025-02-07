var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("keyboards/shareContact", ["require", "exports", "@grammyjs/menu", "grammy"], function (require, exports, menu_1, grammy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shareContactKeyboard = void 0;
    exports.shareContactKeyboard = new menu_1.Menu("share-contact-menu").text("Поделиться номером телефона", async (ctx) => {
        const shareContactKeyboard = new grammy_1.Keyboard()
            .requestContact("Отправить контакт")
            .resized()
            .oneTime();
        await ctx.reply("Отправьте ваш контакт", {
            reply_markup: shareContactKeyboard,
        });
    });
});
define("types/botContextTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("keyboards/inlineKeyboards/confirmKeyboard", ["require", "exports", "grammy"], function (require, exports, grammy_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.confirmInlineKeyboard = void 0;
    exports.confirmInlineKeyboard = new grammy_2.InlineKeyboard()
        .text("Да", "true")
        .text("Нет", "false");
});
define("conversations/auth", ["require", "exports", "keyboards/inlineKeyboards/confirmKeyboard", "keyboards/shareContact"], function (require, exports, confirmKeyboard_js_1, shareContact_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.authentication = authentication;
    async function authentication(conversation, ctx) {
        // Показываем меню для отправки контакта
        await ctx.reply("Добро пожаловать в Teledoc!", {
            reply_markup: shareContact_js_1.shareContactKeyboard,
        }); // Ждём, пока пользователь отправит контакт
        const contactMessage = await conversation.waitFor("message:contact");
        if (!contactMessage.message?.contact?.phone_number) {
            await ctx.reply("Не удалось получить номер телефона. Попробуйте снова.");
            return;
        }
        const userPhoneNumber = contactMessage.message.contact.phone_number;
        await ctx.reply(`Это ваш номер? ${userPhoneNumber} `, {
            reply_markup: confirmKeyboard_js_1.confirmInlineKeyboard,
        });
        const answerResponse = (await conversation.waitFor("callback_query:data"));
        await ctx.api.answerCallbackQuery(answerResponse.callbackQuery.id);
        if (answerResponse.callbackQuery.data === "true") {
            await ctx.reply("Спасибо, вы успешно авторизовались");
        }
        else {
            await ctx.reply("Пожалуйста, отправьте ваш номер телефона в следующем сообщении");
            const textMessage = await conversation.waitFor("message:text");
            const manualPhoneNumber = textMessage.message?.text;
            await ctx.reply(`Спасибо, вы успешно авторизовались. Ваш номер: ${manualPhoneNumber}`);
        }
    }
});
define("commands/start", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setupStartCommand = void 0;
    const setupStartCommand = (bot) => {
        // Подключаем меню
        bot.command("start", async (ctx) => {
            await ctx.conversation.enter("authentication");
        });
    };
    exports.setupStartCommand = setupStartCommand;
});
define("utils/botErrorHandler", ["require", "exports", "grammy"], function (require, exports, grammy_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.botErrorHandler = void 0;
    const botErrorHandler = (bot) => {
        bot.catch((err) => {
            const ctx = err.ctx;
            console.error(`Ошибка при обработке update: ${ctx.update.update_id}`);
            const e = err.error;
            if (e instanceof grammy_3.GrammyError) {
                console.error("Ошибка в запросе:", e.description);
            }
            else if (e instanceof grammy_3.HttpError) {
                console.error("Проблема с подключением к Telegram:", e);
            }
            else {
                console.error("Неизвестная ошибка:", e);
            }
        });
    };
    exports.botErrorHandler = botErrorHandler;
});
define("bot", ["require", "exports", "dotenv", "grammy", "@grammyjs/conversations", "keyboards/shareContact", "conversations/auth", "commands/start", "utils/botErrorHandler"], function (require, exports, dotenv_1, grammy_4, conversations_1, shareContact_js_2, auth_js_1, start_js_1, botErrorHandler_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    dotenv_1 = __importDefault(dotenv_1);
    dotenv_1.default.config();
    const bot = new grammy_4.Bot(process.env.BOT_API_KEY || "");
    bot.use((0, grammy_4.session)({ initial: () => ({}) }));
    bot.use((0, conversations_1.conversations)());
    bot.use(shareContact_js_2.shareContactKeyboard);
    bot.use((0, conversations_1.createConversation)(auth_js_1.authentication));
    (0, start_js_1.setupStartCommand)(bot);
    (0, botErrorHandler_js_1.botErrorHandler)(bot);
    bot.start();
});
define("index", ["require", "exports", "bot"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
