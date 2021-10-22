const discord = require('discord.js');
module.exports = {
	name: 'avatar',
	args: false,
	dontShow: false,
	usage: '<@member>?',
	description: "Returns the author's or the specified user's avatar",
	execute(message, notArgs, client) {
		const { member, mentions } = message;

		const tag = `<@${member.id}>`;

		const embed = new discord.MessageEmbed();

		const args = message.content
			.substring(process.env.PREFIX.length)
			.split(' ');
		args.shift();
		const userAvatar = args[0];
		if (typeof userAvatar === 'string') {
			const target = mentions.users.first();
			if (target) {
				const targetMember = message.guild.members.cache.get(target.id);
				embed
					.setTitle('I fetched the display picture you requested. Here,')
					.setImage(
						targetMember.user.displayAvatarURL({
							format: 'png',
							size: 1024,
						})
					)
					.setColor(`RANDOM`)
					.setAuthor(
						'Riharu Yuki',
						'https://i.imgur.com/H4MIaqZ.png',
						'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
					);
				message.channel.send(embed);
			} else if (!target) {
				const targetMember = message.guild.members.cache.get(userAvatar);
				if (targetMember) {
					embed
						.setTitle('I fetched the display picture you requested. Here,')
						.setImage(
							targetMember.user.displayAvatarURL({
								format: 'png',
								size: 1024,
							})
						)
						.setColor(`RANDOM`)
						.setAuthor(
							'Riharu Yuki',
							'https://i.imgur.com/H4MIaqZ.png',
							'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
						);
					message.channel.send(embed);
				} else {
					message.channel.send(`${tag} Please specify a valid user-id.`);
				}
			}
		} else if (typeof userToKick === 'undefined') {
			embed
				.setTitle('I fetched the display picture you requested. Here,')
				.setImage(
					message.author.displayAvatarURL({
						format: 'png',
						size: 1024,
					})
				)
				.setColor(`RANDOM`)
				.setAuthor(
					'Riharu Yuki',
					'https://i.imgur.com/H4MIaqZ.png',
					'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
				);
			message.channel.send(embed);
		}
	},
};
