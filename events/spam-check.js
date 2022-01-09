module.exports = (client) => {
	client.on('messageCreate', (message) => {
		const { content, member } = message;
		const banDescription = { days: 7, reason: 'Spam link of discord nitro' };
		const badNitroLink = ['https://dliscordl.com/nitro'];
		const re = new RegExp(badNitroLink.join('|'), 'i');

		found = content.search(re);

		// Ramdom Checks
		if (content.includes('https://')) {
			if (
				(content.includes('discord') || content.includes('nitro')) &&
				!content.includes('https://discord.com')
			) {
				found = 1;
			}
		}

		// If found
		if (found != -1) {
			if (member.bannable) {
				// Ban hammer
				member.ban(banDescription).then(() => {
					// Gets channel of that specific name
					const logChannel = member.guild.channels.cache.find(
						(ch) => ch.name === 'logs'
					);
					logChannel.send(
						`Banned user: ${member.displayName} for ${banDescription.days} day(s), reason: ${banDescription.reason}`
					);
				});
			}
		}
	});
};
