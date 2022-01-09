const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	dontShow: false,
	async execute(interaction, client) {
		await interaction.reply('Pong!');
	},
};
