// Doesn't Work
const { SlashCommandBuilder } = require("@discordjs/builders");

const discord = require("discord.js");

const memebers = [
  "Sayoush Subedi",
  "Nisan Shrestha",
  "Aditya Pandey",
  "Abhishek Something",
  "Anju Chettri",
  "Saurav Adhikari",
  "Pramish Aryal",
];

const faculty = [
  "BCT CD",
  "BCT AB",
  "BEI",
  "BCT AB",
  "BEI",
  "BCT CD",
  "BCT AB",
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("komitea")
    .setDescription("Gives info about our committee members")
    .addStringOption((string) =>
      string
        .setName("name")
        .setDescription("name of committee memeber")
        .addChoice(memebers[0], "0")
        .addChoice(memebers[1], "1")
        .addChoice(memebers[2], "2")
        .addChoice(memebers[3], "3")
        .addChoice(memebers[4], "4")
        .addChoice(memebers[5], "5")
    ),
  dontShow: false,
  async execute(interaction, client) {
    const committeeMemberNumber = interaction.options.getString("name");
    if (committeeMemberNumber) {
      let embed = new discord.MessageEmbed().setDescription(
        `From: ${faculty[parseInt(committeeMemberNumber)]}`
      );
      embed.setTitle(`IT ${memebers[parseInt(committeeMemberNumber)]}`);
      await interaction.reply({ embeds: [embed] });
    } else {
      let embed = new discord.MessageEmbed().setTitle("Committee Members");
      for (i = 0; i < memebers.length; i++) {
        embed.addField(`**${memebers[i]}:**`, `${faculty[i]} `, true);
      }
      await interaction.reply({ embeds: [embed] });
    }
  },
};
