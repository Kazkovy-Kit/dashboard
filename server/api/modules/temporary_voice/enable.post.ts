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

    await callBotAPI<BotModuleResponse>(event, `/modules/${guildId}/enable`, {
        method: "POST",
        body: {
            id: 'temporary_voice',
        }
    });
    return 'Ok'
});
