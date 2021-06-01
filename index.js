require('dotenv').config();
const fs = require('fs');
const path = require('path');
const discord = require('discord.js');
const axios = require('axios');
const command_list = require('./command_list.js');

const editJsonFile = require('edit-json-file');
const file = editJsonFile(path.join(__dirname, 'config.json'));

const commands = require('./commands.js');
const welcome = require('./welcome');

const client = new discord.Client();

client.on('ready', () => {
	console.log('the client has logged in');

	commands(client, 'ping', (message) => {
		message.channel.send('Pong');
	});

	commands(client, 'ban', (message) => {
		const { member, mentions } = message;

		const tag = `<@${member.id}>`;

		if (
			member.hasPermission('ADMINISTRATOR') ||
			member.hasPermission('BAN_MEMBERS')
		) {
			const target = mentions.users.first();
			if (target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.ban();
				message.channel.send(`${tag} That user has been`);
			} else {
				message.channel.send(`${tag} Please specify someone to ban.`);
			}
		} else {
			message.channel.send(
				`${tag} You do not have permission to use this command.`
			);
		}
	});

	commands(client, 'kick', (message) => {
		const { member, mentions } = message;

		const tag = `<@${member.id}>`;

		if (
			member.hasPermission('ADMINISTRATOR') ||
			member.hasPermission('KICK_MEMBERS')
		) {
			const target = mentions.users.first();
			if (target) {
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.kick();
				message.channel.send(`${tag} That user has kicked`);
			} else {
				message.channel.send(`${tag} Please specify someone to kick.`);
			}
		} else {
			message.channel.send(
				`${tag} You do not have permission to use this command.`
			);
		}
	});

	commands(client, 'join', (message) => {
		client.emit('guildMemberAdd', message.member);
	});

	commands(client, 'wiki', (message) => {
		const args = message.content
			.slice(process.env.PREFIX.length)
			.trim()
			.split(/ +/);
		let word = args.slice(1).join(' ');

		if (!word) {
			message.channel.send(
				`Please use the correct format. ${process.env.PREFIX}${args[0]} <search-term>`
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

	commands(client, 'nisan', (message) => {
		message.channel.send(
			'https://cdn.discordapp.com/attachments/744591904427081811/846292516009279529/bitch.gif'
		);
	});

	commands(client, 'intro', (message) => {
		// Todo for later
		let reply = '';
		reply += 'Welcome to IT-Club, ';
		reply += '#get-roles';
		message.channel.send(reply);
	});

	commands(client, 'help', (message) => {
		let data = [];
		const args = message.content
			.slice(process.env.PREFIX.length)
			.trim()
			.split(/ +/);
		if (args.length === 1) {
			data.push("Here's a list of all my commands:");
			data.push(command_list.map((command) => command.name).join(', '));
			data.push(
				`\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`
			);
			message.author
				.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply("I've sent you a DM with all my commands!");
				})
				.catch((error) => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);
					message.reply(
						"it seems like I can't DM you! Do you have DMs disabled?"
					);
				});
		} else {
			const name = args[1].toLowerCase();
			const command = command_list.find((element) => element.name === name);

			if (!command) {
				return message.reply("that's not a valid command!");
			}
			data.push(`**Name:** ${command.name}`);
			if (command.description)
				data.push(`**Description:** ${command.description}`);
			// if (command.usage)
			data.push(`**Arguments** ${command.arguments}`);
			data.push(
				`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`
			);

			message.channel.send(data, { split: true });
		}
	});

	welcome(client);

	commands(client, 'msg', (message) => {
		const args = message.content
			.substring(process.env.PREFIX.length)
			.split(' ');
		args.shift();
		file.pop('message');
		file.append('message', args.join(' '));
		file.save();
		console.log(file.get());
	});
});

client.login(process.env.BOT_TOKEN);
