const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = 'a.';
 
const fs = require('fs');

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Allure is online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } 

    if(command === 'commands'){
        client.commands.get('commands').execute(message,args, Discord);
    } else if(command === 'mute'){
        client.commands.get('mute').execute(message, args);

    } else if(command === 'unmute'){
         client.commands.get('unmute').execute(message, args);
    }
});

client.login('ODQzNTYxNjM5MDU5MTI4Mzgx.YKFp_w.F6V3spTNXneBYJacV5-SeOAqwJc');
