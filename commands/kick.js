module.exports = (message) => {
    const { member, mentions } = message;

		const tag = `<@${member.id}>`;

		if (
			member.hasPermission('ADMINISTRATOR') ||
			member.hasPermission('KICK_MEMBERS')
		) {
			const args = message.content
				.substring(process.env.PREFIX.length)
				.split(' ');
			args.shift();
			const userToKick = args[0];
			console.log(userToKick);
			if (typeof userToKick === 'string') {
				const target = mentions.users.first();
				if (target) {
					const targetMember = message.guild.members.cache.get(target.id);
					targetMember.kick();
					message.channel.send(`${tag} That user was kicked`);
				} else if (!target) {
					const targetMember = message.guild.members.cache.get(userToKick);
					targetMember.kick();
					message.channel.send(`<@${userToKick}> That user was kicked`);
				}
			} else if (typeof userToKick === 'undefined') {
				message.channel.send(`${tag} Please specify someone to kick.`);
			}
		} else {
			message.channel.send(
				`${tag} You do not have permission to use this command.`
			);
		}
}