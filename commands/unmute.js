const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a specific user")
    .addUserOption((user) =>
      user.setName("user").setDescription("User to be unmuted").setRequired(true)
    )
    .addStringOption((string) =>
      string.setName("reason").setDescription("Reason for unmute")
    ),
  dontShow: false,
  async execute(interaction, client) {
    const muteEmbed = new discord.MessageEmbed();
    const muteRole = interaction.guild.roles.cache.find(
      (role) => role.name.toLowerCase() === "muted"
    );
    const muteChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === "logs"
    );
    const guildMemeber = await interaction.guild.members.fetch(
      interaction.user.id
    );
    if (
      guildMemeber.permissions.has("ADMINISTRATOR") ||
      guildMemeber.permissions.has("MANAGE_ROLES")
    ) {
      const userToMute = interaction.options.getUser("user");
      const muteReason = interaction.options.getString("reason") || "Good boi/girl";
      const guildMemeber = await interaction.guild.members.fetch(userToMute.id);
      guildMemeber.roles.remove(muteRole).then(() => {
        muteEmbed
          .setTitle("Mute")
          .setThumbnail(guildMemeber.displayAvatarURL())
          .setDescription(
            `User <@${guildMemeber.displayName}> was unmuted because ${muteReason}`
          )
          .setFooter(`Muted by ${interaction.user.displayName}`)
          .setTimestamp();

        muteChannel.send({ embeds: [muteEmbed] });

        interaction.reply(
          `${guildMemeber.displayName} was unmuted because ${muteReason}`
        );
      });
    } else {
       interaction.reply(`${tag} You dont't have permissions.`);
    }
  },
};

