module.exports = (client) => {
	client.on('message', (message) => {
		const { content, member } = message;
		const badNitroLink = '(https://dliscordl.com/nitro)';
		const banDescription = { days: 7, reason: 'Spam link of discord nitro' };

		let re = new RegExp(badNitroLink, 'i');
		found = content.search(re);

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
