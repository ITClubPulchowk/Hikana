const discord = require('discord.js')
const { command_list } = require('./data');
const client = new discord.Client()

module.exports = (client, message) => {
    let data = [];
		let embed = new discord.MessageEmbed();
		embed.setAuthor(client.user.username, client.user.avatarURL(32));
		const args = message.content
			.slice(process.env.PREFIX.length)
			.trim()
			.split(/ +/);
		if (args.length === 1) {
			embed.setTitle("Here's a list of all my commands: ");
			command_list.forEach((command) =>
				embed.addField(command.name, command.description, true)
			);
			embed.setFooter(
				`\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`
			);
			message.channel.send(embed);
		} else {
			const name = args[1].toLowerCase();
			const command = command_list.find((element) => element.name === name);

			if (!command) {
				return message.reply("that's not a valid command!");
			}
			data.push(`**Name:** ${command.name}`);
			embed.setTitle(`**Name:** ${command.name}`);
			embed.addField(`**Description:**`, `${command.description}`);
			embed.addField(`**Arguments:**`, `${command.arguments}`);
			embed.addField(
				`**Usage:**`,
				`${process.env.PREFIX}${command.name} ${command.usage}`
			);

			if (command.description)
				data.push(`**Description:** ${command.description}`);
			// if (command.usage)
			data.push(`**Arguments:** ${command.arguments}`);
			data.push(
				`**Usage:** ${process.env.PREFIX}${command.name} ${command.usage}`
			);

			message.channel.send(embed);
		}
}