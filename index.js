require('dotenv').config();
const discord = require('discord.js');
const getMongoClient = require('./mongo');

const fs = require('fs');
const prefix = process.env.PREFIX;

const nsfwCheck = require('./events/nsfw-check.js');
const welcome = require('./welcome');
const byebye = require('./byebye');

const client = new discord.Client();
client.commands = new discord.Collection();

// Loads up all the commands from commands directory
const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.username}`);

	welcome(client);
	nsfwCheck(client);
	byebye(client);

	const mongoClient = getMongoClient();
	mongoClient.connect(() => {
		console.log('connected to db');
		mongoClient.close();
	});
});

client.on('message', (message) => {
	// Check if self is mentioned

	// IDK why this check is here but this is necessary
	if (message.mentions.memebers) {
		if (message.mentions.members.get(client.user.id)) {
			if (!message.content.startsWith(prefix))
				message.channel.send(`Prefix is: ${process.env.PREFIX}`);
		}
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command_name = args.shift().toLowerCase();

	if (!client.commands.has(command_name)) {
		message.channel.send(
			`Hmm I dont seem to have this command, ${message.author}, type ${prefix}help to get a list of the commands`
		);
		message.channel.send(
			'You can post about it in feature request if you want the feature to be added'
		);
		return;
	}
	const command = client.commands.get(command_name);
	if (command.args && !args.length) {
		return message.channel.send(
			`You forgot the arguments ${message.author}, baka!`
		);
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(process.env.BOT_TOKEN);
