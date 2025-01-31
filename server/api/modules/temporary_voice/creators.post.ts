import {getGuildID} from "~/server/utils/getBotConfig";

type BotModuleResponse = {
    [key: string]: {
        id: string;
        enabled: boolean;
    };
};

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const guildId = getGuildID(event)

    return callBotAPI<BotModuleResponse>(event, `/modules/${guildId}/temporary_voice/creators`, {method: 'post'});
});
