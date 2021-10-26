const discord = require('discord.js');

module.exports = {
	name: 'dm',
	args: true,
	dontShow: false,
	description: 'DM multiple users, (please no unicode emojis)',
	usage: '<@member-list> "<message>"',
	execute(message, args, client) {
		const { member, mentions } = message;
		const userMessage = args.join(' ');
		if (member.hasPermission('ADMINISTRATOR')) {
			const msgRe = /"(\w|\s|\d|<|!|@|>|\?|:|\*|\+|\=|\U)+"/;

			const msg = msgRe.exec(args.join(' '));
			if (!msg) {
				message.channel.send(
					'Regex could not find the input string, please contact developer'
				);
				return;
			}
			const messageReturnContent = msg[0].substring(1, msg[0].length - 1);

			const rolesRe = /<@&(\d+)/g;
			const roles = [];
			while (null != (role = rolesRe.exec(userMessage))) {
				roles.push(role);
			}

			let sendCount = 0;
			let listOfIDsThatWereSentTheMessage = [];
			// Sending messages to specific users
			mentions.users.forEach((user) => {
				if (
					!messageReturnContent.includes(user.id) &&
					!listOfIDsThatWereSentTheMessage.includes(user.id)
				) {
					listOfIDsThatWereSentTheMessage.push(user.id);
					user.send(messageReturnContent);
					sendCount++;
				}
			});

			// Sending messages to users of certain role
			roleIDs = roles.map((r) => r[1]);

			let promises = [];
			roleIDs.forEach((roleID) => {
				promises.push(
					message.guild.roles.fetch(roleID).then((result, err) => {
						result.members.forEach((member) => {
							if (
								!messageReturnContent.includes(member.id) &&
								!listOfIDsThatWereSentTheMessage.includes(member.id)
							) {
								listOfIDsThatWereSentTheMessage.push(member.id);
								member.send(messageReturnContent);
								sendCount++;
							}
						});
					})
				);
			});
			Promise.all(promises).then(() => {
				message.channel.send(`Message sent to ${sendCount} user(s).`);
			});
		} else {
			message.channel.send('Not Enough perms, peasent');
		}
	},
};
