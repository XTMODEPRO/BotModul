/**
 * EXAMPLE: Menggunakan Baileys Clean Version
 * 
 * Semua fitur auto-follow saluran telah dihapus sepenuhnya.
 */

const makeWASocket = require('./lib/Socket/index.js').default;
const { useMultiFileAuthState } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

async function startBot() {
    // Setup auth state
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

    // Initialize socket
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    // Handle credentials update
    sock.ev.on('creds.update', saveCreds);

    // Handle connection update
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 QR Code:', qr);
        }

        if (connection === 'open') {
            console.log('✅ Bot connected!');
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
            console.log('❌ Connection closed, reconnecting:', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            }
        }
    });

    // Handle incoming messages
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        
        if (!msg.key.fromMe && m.type === 'notify') {
            console.log('📨 New message:', msg.body);
        }
    });

    return sock;
}

// Start the bot
startBot().catch(err => {
    console.error('❌ Error starting bot:', err);
    process.exit(1);
});
