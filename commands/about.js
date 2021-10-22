const About = require('../about.json');
const axios = require('axios');
const discord = require('discord.js');

module.exports = {
	name: 'about',
	args: false,
	dontShow: false,
	description: 'Gives info about the bot',
	execute(message, args, client) {
		let embed = new discord.MessageEmbed();
		embed.setAuthor(client.user.username, client.user.avatarURL(32));
		for (key of Object.keys(About)) {
			embed.addField(key, About[key], true);
		}
		axios
			.get(
				'https://api.github.com/repos/IT-Club-Pulchowk/Hikana/contributors',
				{
					Accept: 'application/vnd.github.v3+json',
				}
			)
			.then((res) => {
				let contributors = [];
				res.data.forEach((person) => {
					contributors.push(person.login);
				});
				if (contributors.length > 0) {
					embed.addField('Developers', contributors.join(', '));
				}
				message.channel.send(embed);
			});
	},
};
