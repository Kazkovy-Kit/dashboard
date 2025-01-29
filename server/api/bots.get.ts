import prisma from "~/lib/prisma";
import {pingBotAPI} from "~/server/utils/getBotConfig";

export default defineEventHandler(async (event) => {
    await requireUserSession(event);

    const botConfigs = await prisma.botConfig.findMany()
    const pingPromises = botConfigs.map(botConfig => pingBotAPI(botConfig))
    const pings = await Promise.all(pingPromises)

    return botConfigs.map((botConfig, key) => ({
        ...botConfig,
        guildSum: Number(botConfig.guildSum),
        online: pings[key]
    }))
});
