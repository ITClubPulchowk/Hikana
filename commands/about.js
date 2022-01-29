const About = require("../about.json")

const axios = require('axios');
const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Gives info about the bot'),
	args: false,
	dontShow: false,
	async execute(interaction, client) {
		let embed = new discord.MessageEmbed();
    await interaction.deferReply();
		embed.setAuthor(client.user.username, client.user.avatarURL(32));
		embed.setColor('#0099ff');
		for (key of Object.keys(About)) {
			embed.addField(key, About[key], true);
		}

		const contributorsString = await getContributors();
		embed.addField('Developers', contributorsString);

		await interaction.editReply({ embeds: [embed] });
	},
};

async function getContributors() {
	const res = await axios.get(
		'https://api.github.com/repos/IT-Club-Pulchowk/Hikana/contributors',
		{
			Accept: 'application/vnd.github.v3+json',
		}
	);
	if (await res) {
		let contributors = [];
		res.data.forEach((person) => {
			contributors.push(person.login);
		});
		if (contributors.length > 0) {
			return contributors.join(', ');
		}
	} else return 'No contributors';
}
