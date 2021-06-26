require('dotenv').config();
const discord = require('discord.js');

const path = require('path')
const editJsonFile = require('edit-json-file');
const file = editJsonFile(path.join(__dirname, 'config.json'));

const nsfwCheck = require('./nsfw-check.js');
const whenMentioned = require('./commands/whenMentioned');
const commands = require('./commands.js');
const welcome = require('./welcome');
const ping = require('./commands/ping.js');
const ban = require('./commands/ban.js');
const kick = require('./commands/kick.js');
const help = require('./commands/help.js');
const plot = require('./commands/plot.js');
const about = require('./commands/about.js');
const q = require('./commands/q.js');
const avatar = require('./commands/avatar.js');
const mute = require('./commands/mute.js');
const unmute = require('./commands/unmute.js');
const anime = require('./commands/anime.js');
const animeSearch = require('./commands/animeSearch.js');

const client = new discord.Client();

let questions_in_question_channel = [];
client.on('ready', () => {
	console.log('the client has logged in');

	commands(client, 'ping', (message) => {
		ping(message);
	});

	commands(client, 'ban', (message) => {
		ban(message)
	});

	commands(client, 'kick', (message) => {
		kick(message)
	});

	commands(client, 'join', (message) => {
		client.emit('guildMemberAdd', message.member);
	});

	/*
	commands(client, 'wiki', (message) => {
		const args = message.content
			.slice(process.env.PREFIX.length)
			.trim()
			.split(/ +/);
		const command_name = args[0];
		args.shift();
		let word = args.join(' ');

		if (!word) {
			message.channel.send(
				`Use the correct format, baka. ${process.env.PREFIX}${command_name} <search-term>`
			);
		} else {
			let url = 'https://en.wikipedia.org/w/api.php';

			let params = {
				action: 'opensearch',
				search: word,
				limit: '1',
				namespace: '0',
				format: 'json',
			};

			url = url + '?origin=*';
			Object.keys(params).forEach(function (key) {
				url += '&' + key + '=' + params[key];
			});

			axios(url).then(function (response) {
				message.channel.send(response.data[3]);
			});
		}
	});
	*/

	/*
	commands(client, 'nisan', (message) => {
		message.channel.send(
			'https://cdn.discordapp.com/attachments/744591904427081811/846292516009279529/bitch.gif'
		);
	});
	*/

	commands(client, 'intro', (message) => {
		// Todo for later
		let embed = new discord.MessageEmbed();
		embed.setTitle('Welcome to C Event by IT-CLUB, Pulchowk');
		embed.setAuthor(client.user.username, client.user.avatarURL(32));
		message.channel.send(embed);
	});

	commands(client, 'help', (message) => {
		help(client, message)
	});

	commands(client, 'react', (message) => {
		message.react('⚽');
	});
	commands(client, 'plot', (message) => {
		plot(message)
	});

	nsfwCheck(client);

	commands(client, 'code', (message) => {
		const link = 'https://github.com/IT-Club-Pulchowk/Hikana';
		let embed = new discord.MessageEmbed().setDescription(link);
		message.channel.send(embed);
	});

	commands(client, 'about', (message) => {
		about(client, message)
	});

	commands(client, 'q', (message) => {
		q(message);
	});

	commands(client, 'notice', (message) => {
		message.channel.send('some mmsg');
	});

	welcome(client); 

	commands(client, 'join', (message) => {
		client.emit('guildMemberAdd', message.member)
	})
	
	whenMentioned(client);

	commands(client, 'welcomeMessage', (message) => {
		const { member } = message;
		if (member.hasPermission('ADMINISTRATOR')) {
			const args = message.content
				.substring(process.env.PREFIX.length)
				.split(' ');
			args.shift();
			file.pop('message');
			file.append('message', args.join(' '));
			file.save();
		} else if (!member.hasPermission('ADMINISTRATOR')) {
			message.channel.send(
				`<@${member.id}> You don't have permissions for this command.`
			);
		}
	});

	commands(client, 'avatar', (message) => {
		avatar(message)
	});

	commands(client, 'mute', (message) => {
		mute(message);
	});

	commands(client, 'unmute', (message) => {
		unmute(message)
	});

	commands(client, 'color', (message) => {
		const { member } = message;
		
		if (member.hasPermission('MANAGE_ROLES')) {
			const embed = new discord.MessageEmbed()
			const args = message.content.substring(process.env.PREFIX.length).split(' ')
			args.shift()
			const role = message.guild.roles.cache.find( role => role.name === `${args[0]}`)
			role.setColor(args[1]);
			embed.setTitle(`The role color was updated to ${args[1]}`)
				.setColor(args[1])
				.setTimestamp()
			return message.channel.send(embed)	
		} else {
			message.channel.send(`<@${message.author.id}> you dont have permissions.`)
		}
		
	});

	commands(client, 'anime', (message) => {
		anime(message)
	});

	commands(client, 'search', message => {
		animeSearch(message)
	})

});

client.login(process.env.BOT_TOKEN);
