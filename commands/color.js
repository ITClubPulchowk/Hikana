const discord = require('discord.js');
// Needs more documentation
module.exports = {
	name: 'color',
	args: true,
	dontShow: false,
	description: 'Changes the color of a role',
	execute(message, notargs, client) {
		const { member } = message;

		if (member.hasPermission('MANAGE_ROLES')) {
			const embed = new discord.MessageEmbed();
			const args = message.content
				.substring(process.env.PREFIX.length)
				.split(' ');
			args.shift();
			const role = message.guild.roles.cache.find(
				(role) => role.name === `${args[0]}`
			);
			role.setColor(args[1]);
			embed
				.setTitle(`The role color was updated to ${args[1]}`)
				.setColor(args[1])
				.setTimestamp();
			return message.channel.send(embed);
		} else {
			message.channel.send(
				`<@${message.author.id}> insufficient permissions baka.`
			);
		}
	},
};
