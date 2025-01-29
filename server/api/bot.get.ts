import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
    await requireUserSession(event);
    const botId = parseInt(getCookie(event, 'selected:bot') ?? '')

    return (await prisma.botConfig.findMany()).map((botConfig) => ({
        ...botConfig,
        guildSum: Number(botConfig.guildSum)
    })).find(bot => bot.id === botId)
});
