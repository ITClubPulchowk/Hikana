const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans number of the server")
    .addMentionableOption((mention) =>
      mention
        .setName("mention")
        .setDescription("User whom to bad")
        .setRequired(true)
    )
    .addStringOption((string) =>
      string
        .setName("reason")
        .setDescription("Reason for ban")
        .setRequired(false)
    ),
  dontShow: false,
  async execute(interaction) {
    const reason = interaction.options.getString("reason");
    const guildMemeber = await interaction.guild.members.fetch(
      interaction.user.id
    );
    if (
      guildMemeber.permissions.has("ADMINISTRATOR") ||
      guildMemeber.permissions.has("BAN_MEMBERS")
    ) {
      target = interaction.options.getMentionable("mention");
      if (target.user) {
        target
          .ban({
            days: 7,
            reason: reason ? reason : "Bad boi",
          })
          .then(() =>
            interaction.reply(
              `Banned user: ${target.user.username}. Reason: ${reason}`
            )
          );
      } else {
        interaction.reply("Cound not find the user");
      }
    }
  },
};
