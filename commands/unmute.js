const discord = require('discord.js');

module.exports = {
	name: 'unmute',
	args: true,
	dontShow: false,
	description: 'Unmutes a user',
	usage: '<@member>',
	execute(message, args, client) {
		const { member, mentions } = message;
		const tag = `<@${member.id}>`;
		const unmuteEmbed = new discord.MessageEmbed();
		const muteRole = member.guild.roles.cache.find(
			(role) => role.name.toLowerCase() === 'muted'
		);
		const unmuteChannel = member.guild.channels.cache.find(
			(channel) => channel.name === 'logs'
		);
		if (
			member.hasPermission('ADMINISTRATOR') ||
			member.hasPermission('MANAGE_ROLES')
		) {
			const args = message.content
				.substring(process.env.PREFIX.length)
				.split(' ');
			args.shift();
			const userToUnmute = args[0];
			if (typeof userToUnmute === 'string') {
				const target = mentions.users.first();
				if (target) {
					const targetMember = message.guild.members.cache.get(target.id);
					message.guild.member(targetMember.user).roles.remove(muteRole);
					message.channel.send(`<@${targetMember.id}> was unmuted.`);
					unmuteEmbed
						.setTitle('Unmute')
						.setThumbnail(targetMember.user.displayAvatarURL())
						.setDescription(`User <@${target.id}> was unmuted`)
						.setFooter(`Unmuted by ${message.author.tag}`)
						.setTimestamp();
					unmuteChannel.send(unmuteEmbed);
					return message.channel.send(unmuteEmbed);
				} else if (!target) {
					const targetMember = message.guild.members.cache.get(userToUnmute);
					if (targetMember) {
						targetMember.user.roles.remove(muteRole);
						message.channel.send(`<@${targetMember.user.id} was unmuted>`);
						muteEmbed
							.setTitle('Unmute')
							.setThumbnail(targetMember.user.displayAvatarURL())
							.setDescription(`User <@${target.id}> was unmuted`)
							.setFooter(`Unuted by ${message.author.tag}`)
							.setTimestamp();
						unmuteChannel.send(unmuteEmbed);
						return message.channel.send(unmuteEmbed);
					} else if (!targetMember) {
						return message.channel.send(
							`${tag} Please specify a valid user-id.`
						);
					}
				}
			} else if (typeof userToMute === 'undefined') {
				return message.channel.send(`${tag} Please specify a user to unmute.`);
			} else if (
				!message.guild.member(client.user.id).hasPermission('MANAGE_ROLES')
			) {
				message.channe.send(`${tag} I dont have permissions.`);
			}
		} else {
			return message.channel.send(`${tag} You dont't have permissions.`);
		}
	},
};
