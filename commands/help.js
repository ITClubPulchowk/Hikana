const discord = require('discord.js');

module.exports = {
	name: 'help',
	args: false,
	dontShow: false,
	description: 'Displays the help information',
	usage: '<command-name?>',
	execute(message, args, client) {
		let data = [];
		const { commands } = client;

		let embed = new discord.MessageEmbed();
		embed.setAuthor(client.user.username, client.user.avatarURL(32));
		if (!args.length) {
			embed.setTitle("Here's a list of all my commands: ");
			commands.forEach((command) => {
				if (!command.dontShow)
					embed.addField(command.name, command.description, true);
			});
			embed.setFooter(
				`\nYou can send \`${process.env.PREFIX}help [command name]\` to get info on a specific command!`
			);
			message.channel.send(embed);
		} else {
			const name = args[0].toLowerCase();
			const command = commands.find((element) => element.name === name);

			if (!command) {
				return message.reply("that's not a valid command!");
			}
			data.push(`**Name:** ${command.name}`);
			embed.setTitle(`**Name:** ${command.name}`);
			embed.addField(`**Description:**`, `${command.description}`);

			if (command.args) embed.addField(`**Arguments:**`, `${command.args}`);

			if (command.usage) {
				embed.addField(
					`**Usage:**`,
					`${process.env.PREFIX}${command.name} ${command.usage}`
				);
			}
			message.channel.send(embed);
		}
	},
};
