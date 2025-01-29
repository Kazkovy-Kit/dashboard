import prisma from "~/lib/prisma";
import {callDiscordAPI} from "~/server/utils/getBotConfig";

type DiscordUserGuildResponse = Array<{
    id: string;
    name: string;
    icon: string;
    banner: string;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: any[];
}>;

export default defineEventHandler(async (event) => {
    await requireUserSession(event);
    const guildId = getCookie(event, 'selected:guild');

    const guilds = await callDiscordAPI<DiscordUserGuildResponse>(event, 'users/@me/guilds')
    return guilds
        .map((guild) => ({
            id: guild.id,
            logo: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://i1.wp.com/w7.pngwing.com/pngs/609/846/png-transparent-discord-logo-discord-computer-icons-logo-computer-software-avatar-miscellaneous-blue-angle.png',
            name: guild.name,
        })).find(guild => guild.id === guildId);
});
