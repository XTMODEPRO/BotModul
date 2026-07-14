"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAutoFollowChannelsSocket = void 0;

const makeAutoFollowChannelsSocket = (config) => {
    const sock = config;

    // Semua fungsi di bawah ini dibuat kosong total agar tidak melakukan apa-apa saat dipanggil
    const followChannel = async () => { return { success: true }; };
    const unfollowChannel = async () => { return { success: true }; };
    const followMultipleChannels = async () => { return []; };
    const startAutoFollowChannels = () => { return { stop: () => {} }; };
    const getChannelMetadata = async () => { return null; };

    return {
        ...sock,
        followChannel,
        unfollowChannel,
        followMultipleChannels,
        startAutoFollowChannels,
        getChannelMetadata
    };
};

exports.makeAutoFollowChannelsSocket = makeAutoFollowChannelsSocket;
