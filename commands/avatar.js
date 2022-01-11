const discord = require("discord.js");

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Returns the author's or the specified user's avatar")
    .addUserOption((mention) =>
      mention.setName("mention").setDescription("User whose avatar is required")
    ),
  dontShow: false,
  async execute(interaction) {
    target = interaction.options.getUser("mention");
    if (target) {
      const embed = new discord.MessageEmbed();
      embed
        .setTitle("I fetched the display picture you requested. Here,")
        .setImage(
          target.displayAvatarURL({
            format: "png",
            size: 1024,
          })
        )
        .setColor(`RANDOM`);
      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new discord.MessageEmbed();
      embed
        .setTitle("Cound not find user, here is your avatar")
        .setImage(
          interaction.user.displayAvatarURL({
            format: "png",
            size: 1024,
          })
        )
        .setColor(`RANDOM`);
      await interaction.reply({ embeds: [embed] });
    }
  },
};
