import {getGuildID} from "~/server/utils/getBotConfig";
import {z} from "zod";

type BotModuleResponse = {
    [key: string]: {
        id: string;
        enabled: boolean;
    };
};

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const guildId = getGuildID(event)

    const {data: body} = await readValidatedBody(event, z.object({
        type: z.string(),
        actions: z.array(z.string()),
    }).safeParse)

    return callBotAPI<BotModuleResponse>(event, `/modules/${guildId}/temporary_voice/settings`, {method: 'post', body});
});
