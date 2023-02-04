const { Client, Events, GatewayIntentBits } = require('discord.js');
const auth = require('./auth.json');
const targets = require("./targets.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate',
    function (message){
        const username = message.author.username + "#" + message.author.discriminator;
        const emojis = targets[username];
        if (username in targets) {
            message.react(emojis[Math.floor(Math.random()*emojis.length)]);
        }
    }
)

client.login(auth.token).then(console.log);
