const discord = require('discord.js');

module.exports = {
	name: 'dm',
	args: true,
	dontShow: false,
	description: 'DM multiple users',
	usage: '<@member-list> "<message>"',
	execute(message, args, client) {
		const { member, mentions } = message;
		if (member.hasPermission('ADMINISTRATOR')) {
			const msgRe = /"(\w|\s|\d|<|!|@|>|\?)+"/;

			const msg = msgRe.exec(args.join(' '));
			if (!msg) {
				message.channel.send(
					'Regex could not find the input string, please contact developer'
				);
				return;
			}

			mentions.users.forEach((user) => {
				if (!msg[0].includes(user.id))
					user.send(msg[0].substring(1, msg[0].length - 1));
			});
		}
	},
};
