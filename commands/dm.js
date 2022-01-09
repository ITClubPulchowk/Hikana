const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('DM a message to user(s)')
		.addMentionableOption((mention) =>
			mention
				.setName('mention')
				.setDescription('The person or role you want to send the dm')
				.setRequired(true)
		)
		.addStringOption((string) =>
			string
				.setName('msg')
				.setDescription('Message to be sent')
				.setRequired(true)
		),
	dontShow: false,
	async execute(interaction, client) {
		const msg = interaction.options.getString('msg');
		mention = interaction.options.getMentionable('mention');

		let sendCount = 0;
		if (mention.user) {
			await mention.user.send(msg);
			sendCount++;
		} else {
			await interaction.guild.roles.fetch(mention.id).then((result, err) => {
				result.members.forEach((member) => {
					member.send(msg);
					sendCount++;
				});
			});
		}
		interaction.reply(`Message sent to ${sendCount} user(s).`);
	},
};
