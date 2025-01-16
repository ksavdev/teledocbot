import { Context } from "grammy";

import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";

export type BotContext = Context & ConversationFlavor;

export type BotConversation = Conversation<BotContext>;