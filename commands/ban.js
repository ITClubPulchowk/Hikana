module.exports = (message) => {
    const { member, mentions } = message;

		const tag = `<@${member.id}>`;

		if (
			member.hasPermission('ADMINISTRATOR') ||
			member.hasPermission('BAN_MEMBERS')
		) {
			const args = message.content
				.substring(process.env.PREFIX.length)
				.split(' ');
			args.shift();
			const userToBan = args[0];
			console.log(userToBan);
			if (typeof userToBan === 'string') {
				const target = mentions.users.first();
				if (target) {
					const targetMember = message.guild.members.cache.get(target.id);
					targetMember.ban();
					message.channel.send(`${tag} That user was banned`);
				} else if (!target) {
					const targetMember = message.guild.members.cache.get(userToBan);
					targetMember.ban();
					message.channel.send(`<@${tag}> That user was banned`);
				}
			} else if (typeof userToBan === 'undefined') {
				message.channel.send(`${tag} Please specify someone to ban.`);
			}
		} else {
			message.channel.send(
				`${tag} You do not have permission to use this command.`
			);
		}
}