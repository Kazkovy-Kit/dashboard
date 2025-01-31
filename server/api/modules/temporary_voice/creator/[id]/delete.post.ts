import {getGuildID} from "~/server/utils/getBotConfig";

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const guildId = getGuildID(event)
    const {id} = getRouterParams(event)

    return callBotAPI(event, `/modules/${guildId}/temporary_voice/creators/${id}`, {
        method: "DELETE",
    });
});
