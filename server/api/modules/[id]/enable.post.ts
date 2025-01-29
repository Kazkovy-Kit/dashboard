import {callBotAPI, getGuildID} from "~/server/utils/getBotConfig";

type BotModuleResponse = {
    [key: string]: {
        id: string;
        enabled: boolean;
    };
};

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const id = getRouterParam(event, 'id')

    const guildId = getGuildID(event)

    await callBotAPI<BotModuleResponse>(event, `/modules/${guildId}/enable`, {
        method: "POST",
        body: {
            id
        }
    });
    return 'Ok'
});
