module.exports = {
	name: 'code',
	args: false,
	dontShow: false,
	description: 'Gets the github link',
	execute(message, args, client) {
		const link = 'https://github.com/IT-Club-Pulchowk/Hikana';
		let embed = new discord.MessageEmbed().setDescription(link);
		message.channel.send(embed);
	},
};
