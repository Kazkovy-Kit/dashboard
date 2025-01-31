import {getGuildID} from "~/server/utils/getBotConfig";

export default defineCachedEventHandler(async (event) => {

    await requireUserSession(event)

    const guildId = getGuildID(event)

    return await callBotAPI(event, `/guilds/${guildId}/categories`);

}, {
    varies: ['cookie', 'selected:bot', 'selected:guild', 'host', 'x-forwarded-host']
});
