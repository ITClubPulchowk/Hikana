const discord = require('discord.js');

module.exports = {
	name: 'mute',
	args: true,
	dontShow: false,
	description: 'Mutes a specified user',
	usage: '<@member>',
	execute(message, notargs, client) {
		const { member, mentions } = message;
		const tag = `<@${member.id}>`;
		const muteEmbed = new discord.MessageEmbed();
		const muteRole = member.guild.roles.cache.find(
			(role) => role.name.toLowerCase() === 'muted'
		);
		const muteChannel = member.guild.channels.cache.find(
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
			const userToMute = args[0];
			const muteReason = args.slice(1).join(' ');
			if (typeof userToMute === 'string') {
				const target = mentions.users.first();
				if (target) {
					const targetMember = message.guild.members.cache.get(target.id);
					const removeRoles = message.guild.member(targetMember.user).roles
						.cache;
					message.guild.member(targetMember.user).roles.remove(removeRoles);
					message.guild.member(targetMember.user).roles.add(muteRole);
					message.channel.send(`<@${targetMember.id}> was muted.`);
					muteEmbed
						.setTitle('Mute')
						.setThumbnail(targetMember.user.displayAvatarURL())
						.setDescription(`User <@${target.id}> was muted for ${muteReason}`)
						.setFooter(`Muted by ${message.author.tag}`)
						.setTimestamp();
					muteChannel.send(muteEmbed);
					return message.channel.send(muteEmbed);
				} else if (!target) {
					const targetMember = message.guild.members.cache.get(userToMute);
					if (targetMember) {
						const removeRoles = message.guild.member(targetMember.user).roles
							.cache;
						message.guild.member(targetMember.user).roles.remove(removeRoles);
						targetMember.user.roles.add(muteRole);
						message.channel.send(`<@${targetMember.user.id} was muted>`);
						muteEmbed
							.setTitle('Mute')
							.setThumbnail(targetMember.user.displayAvatarURL())
							.setDescription(
								`User <@${target.id}> was muted for ${muteReason}`
							)
							.setFooter(`Muted by ${message.author.tag}`)
							.setTimestamp();
						muteChannel.send(muteEmbed);
						return message.channel.send(muteEmbed);
					} else if (!targetMember) {
						return message.channel.send(
							`<@${tag}> Please specify a valid user-id.`
						);
					}
				}
			} else if (typeof userToMute === 'undefined') {
				return message.channel.send(`<@${tag}> Please specify a user to mute.`);
			} else if (
				!message.guild.member(client.user.id).hasPermission('MANAGE_ROLES')
			) {
				message.channe.send(`<@${tag}> I dont have permissions.`);
			}
		} else {
			return message.channel.send(`${tag} You dont't have permissions.`);
		}
	},
};
