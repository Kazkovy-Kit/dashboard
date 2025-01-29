import prisma from "~/lib/prisma";
import {H3Event} from "h3";
import {BotConfig} from "@prisma/client";

export const getBotConfig = async (event: H3Event) => {
    let {'x-bot-id': botId} = getHeaders(event)

    if (!botId) {
        botId = getCookie(event, 'selected:bot')
    }

    if (!botId) {
        throw createError({
            statusCode: 404,
            statusMessage: "Bot ID not found",
        });
    }


    const data = await prisma.botConfig.findFirst({
        where: {
            id: parseInt(botId),
        },
    });

    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: "Bot config not found",
        });
    }

    return data;
}

export const getGuildID = (event: H3Event) => {
    const guildId = getCookie(event, 'selected:guild');
    if (!guildId) {
        throw createError({
            statusCode: 404,
            statusMessage: "Guild ID not found",
        });
    }
    return guildId;
}

export const getDiscordToken = async (event: H3Event): Promise<string> => {
    const {secure} = await requireUserSession(event);

    if (!secure) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Session not found'
        });
    }

    //@ts-ignore
    const token = secure.token as {
        token_type: string;
        access_token: string;
    };

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: "No discord token found",
        });
    }


    return `${token.token_type} ${token.access_token}`;
}

export const callDiscordAPI = async <T>(event: H3Event, path: string, opts: {
    [key: string]: any
} = {}): Promise<T> => {
    const discordToken = await getDiscordToken(event);
    return $fetch<T>(
        "https://discord.com/api/" + path,
        {
            headers: {
                Authorization: discordToken,
            },
        },
    );
}

export const callBotAPI = async <T>(event: H3Event, path: string, opts: any = {}): Promise<T> => {
    const botConfig = await getBotConfig(event);
    return $fetch<T>(
        botConfig.host + path,
        {
            ...opts,
            headers: {
                Authorization: `Bearer ${botConfig.token}`,
            },
        },
    );
}

export const pingBotAPI = async (botConfig: BotConfig): Promise<boolean> => {
    try {
        const data = await $fetch(
            botConfig.host,
            {
                headers: {
                    Authorization: `Bearer ${botConfig.token}`
                }
            }
        )
        return true
    } catch (e) {
        return false;
    }
}