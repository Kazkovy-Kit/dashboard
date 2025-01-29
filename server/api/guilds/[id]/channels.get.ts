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
    const {id} = getRouterParams(event)

    return await callDiscordAPI<DiscordUserGuildResponse>(
        event,
        `guilds/${id}/channels`
    )

});
