const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Gets the github link'),
	dontShow: false,
	async execute(interaction, client) {
		const link = 'https://github.com/IT-Club-Pulchowk/Hikana';
		let embed = new discord.MessageEmbed().setDescription(link);
		interaction.reply({ embeds: [embed] });
	},
};
