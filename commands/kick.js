const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks number of the server")
    .addMentionableOption((mention) =>
      mention
        .setName("mention")
        .setDescription("User whom to kick")
        .setRequired(true)
    )
    .addStringOption((string) =>
      string
        .setName("reason")
        .setDescription("Reason for kick")
        .setRequired(false)
    ),
  dontShow: false,
  async execute(interaction) {
    let reason = interaction.options.getString("reason");
		reason = reason ? reason:  "bad boi"

    const guildMemeber = await interaction.guild.members.fetch(
      interaction.user.id
    );
    if (
      guildMemeber.permissions.has("ADMINISTRATOR") ||
      guildMemeber.permissions.has("KICK_MEMBERS")
    ) {
      target = interaction.options.getMentionable("mention");
      if (target.user) {
        target
          .kick(reason)
          .then(() => interaction.reply(`Kicked user: ${target.user.username}. Reason: ${reason}`));
      } else {
        interaction.reply("Cound not find the user");
      }
    } else {
      interaction.reply("Not enough perms peasent");
    }
  },
};
