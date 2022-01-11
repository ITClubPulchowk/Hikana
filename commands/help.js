const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays the help information')
		.addStringOption((string) =>
			string
				.setName('command_name')
				.setDescription('Name of the command to be searched for')
		),
	dontShow: false,
	async execute(interaction, client) {
		let data = [];
		const { commands } = client;

		let embed = new discord.MessageEmbed();
		embed.setAuthor(client.user.username, client.user.avatarURL(32));
		if (!interaction.options.getString('command_name')) {
			embed.setTitle("Here's a list of all my commands: ");
			commands.forEach((command) => {
				if (!command.dontShow)
					embed.addField(command.data.name, command.data.description, true);
			});
			embed.setFooter(
				`\nYou can send \`/help [command name]\` to get info on a specific command!`
			);
			interaction.reply({ embeds: [embed] });
		} else {
			const name = interaction.options.getString('command_name');
			const command = commands.find((element) => element.data.name === name);

			if (!command) {
				return interaction.reply(
					"that's not a valid command! If you want this to be a valid command, please contact a developer with a feature request"
				);
			}
			data.push(`**Name:** ${command.data.name}`);
			embed.setTitle(`**Name:** ${command.data.name}`);
			embed.addField(`**Description:**`, `${command.data.description}`);
			command.data.options.forEach((option) => {
				embed.addField(
					`**Argument ${option.name}:**`,
					`${option.description}.${option.required ? '** Required**' : ''} `
				);
			});
			interaction.reply({ embeds: [embed] });
		}
	},
};
