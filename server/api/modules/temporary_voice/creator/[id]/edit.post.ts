import {getGuildID} from "~/server/utils/getBotConfig";
import {z} from "zod";

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const guildId = getGuildID(event)
    const {id} = getRouterParams(event)

    const {data: body} = await readValidatedBody(event, z.object({
        name: z.string(),
        source_parent_id: z.string().nullish(),
    }).safeParse)

    return callBotAPI(event, `/modules/${guildId}/temporary_voice/creators/${id}`, {
        method: "POST",
        body,
    });
});
