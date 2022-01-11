// Doesn't Work
const { SlashCommandBuilder } = require("@discordjs/builders");

const discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .setDescription("Changes the color of a role")
    .addRoleOption((role) =>
      role
        .setName("role")
        .setDescription("Role to change color")
        .setRequired(true)
    )
    .addIntegerOption((int) =>
      int
        .setName("color")
        .setDescription("The color to change the role to")
        .setRequired(true)
        .addChoice("Default", 0)
        .addChoice("Aqua", 1752220)
        .addChoice(`DARK_AQUA`, 1146986)
        .addChoice(`GREEN`, 3066993)
        .addChoice(`DARK_GREEN`, 2067276)
        .addChoice(`BLUE`, 3447003)
        .addChoice(`DARK_BLUE`, 2123412)
        .addChoice(`PURPLE`, 10181046)
        .addChoice(`DARK_PURPLE`, 7419530)
        .addChoice(`LUMINOUS_VIVID_PINK`, 15277667)
        .addChoice(`DARK_VIVID_PINK`, 11342935)
        .addChoice(`GOLD`, 15844367)
        .addChoice(`DARK_GOLD`, 12745742)
        .addChoice(`ORANGE`, 15105570)
        .addChoice(`DARK_ORANGE`, 11027200)
        .addChoice(`RED`, 15158332)
        .addChoice(`DARK_RED`, 10038562)
        .addChoice(`GREY`, 9807270)
        .addChoice(`DARK_GREY`, 9936031)
        .addChoice(`DARKER_GREY`, 8359053)
        .addChoice(`LIGHT_GREY`, 12370112)
        .addChoice(`NAVY`, 3426654)
        .addChoice(`DARK_NAVY`, 2899536)
        .addChoice(`YELLOW`, 16776960)
    ),
  dontShow: false,
  async execute(interaction, client) {
    const guildMemeber = await interaction.guild.members.fetch(
      interaction.user.id
    );

		await interaction.deferReply();
    const role = interaction.options.getRole("role");
    const color = interaction.options.getInteger("color");
    if (guildMemeber.permissions.has("MANAGE_ROLES")) {
      try {
        await role.setColor(color);
        const embed = new discord.MessageEmbed();
        embed
          .setTitle(`The role color was updated to ${color}`)
          .setColor(color)
          .setTimestamp();
        await interaction.editReply({ embeds: [embed] });
      } catch (e) {
        console.log(e);
        await interaction.editReply("Error Occoured");
      }
    } else {
      await interaction.editReply("Not enough Perms BAKA!!");
    }
  },
};
