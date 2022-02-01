const fs = require("fs");
const Jikan = require("jikan-node");
const mal = new Jikan();

const { SlashCommandBuilder } = require("@discordjs/builders");
const discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animesearch")
    .setDescription("Searches a anime")
    .addStringOption((string) =>
      string.setName("title").setDescription("Anime title").setRequired(true)
    )
    .addIntegerOption((number) =>
      number.setName("pg-num").setDescription("Page Number").setRequired(false)
    ),

  dontShow: false,
  async execute(interaction, client) {
    await interaction.deferReply();
    let embed = new discord.MessageEmbed();
    let title = interaction.options.getString("title");
    let pgNo = 1;
    if (interaction.options.getInteger("pg-num"))
      pgNo = interaction.options.getInteger("pg-num");
    if (pgNo < 1) pgNo = 1;
    if (pgNo > 4) pgNo = 5;

    // Special case for Ashish dai
    forAshishDai = [
      "bleach",
      "Kuzu  no honkai",
      "tokyo ghoul",
      "mirai nikki",
      "another",
      "wonder egg priority",
      "school days",
    ];

    if (interaction.user.id == "350940972668157952") {
      let pick = Math.floor(Math.random() * 10);
      if (pick == 0) return;

      pick = Math.floor(Math.random() * 10);
      if (pick < 8 || title == "oregairu" || title == "hibike") {
        const AshishDaiKoFavAnime =
          forAshishDai[Math.floor(Math.random() * forAshishDai.length)];
        title = AshishDaiKoFavAnime;
      }
    }

    mal
      .search("anime", title, 1)
      .then((res) => {
        const startPos = (pgNo - 1) * 10;
        const endPos = startPos + 10;

        for (let i = startPos; i < endPos; i++) {
          const result = res.results[i];
          if (result.synopsis.length > 0)
            embed.addField(`${i + 1}. ${result.title}`, result.synopsis);
        }
        embed.setFooter(`Page ${pgNo} of 5`);
         interaction.editReply({ embeds: [embed] });
      })
      .catch((err) => {
         interaction.editReply(`Error. Could not find ${title}`);
        console.log(err);
      });
  },
};
