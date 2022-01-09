const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('nisan').setDescription('Nisan'),
	dontShow: false,
	async execute(interaction, client) {
		await interaction.reply(
			'https://cdn.discordapp.com/attachments/744591904427081811/846292516009279529/bitch.gif'
		);
	},
};
