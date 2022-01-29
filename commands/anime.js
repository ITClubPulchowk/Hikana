require("dotenv").config();
const Jikan = require("jikan-node");
const mal = new Jikan();

const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("Returns info about anime")
    .addStringOption((string) =>
      string
        .setName("anime-name")
        .setDescription("The anime title")
        .setRequired(true)
    ),
  dontShow: false,
  async execute(interaction, client) {
    const embed = new discord.MessageEmbed();
    let title = interaction.options.getString("anime-name");
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

    if (interaction.user.id == "746302084718264381") {
      let pick = Math.floor(Math.random() * 10);
      if (pick == 0) return;

      pick = Math.floor(Math.random() * 10);
      if (pick < 8 || title == "oregairu") {
        const AshishDaiKoFavAnime =
          forAshishDai[Math.floor(Math.random() * forAshishDai.length)];
        title = AshishDaiKoFavAnime;
      }
    }

    await interaction.deferReply();
    mal
      .search("anime", title)
      .then((res) => {
        const result = res.results[1];
        embed
          .setTitle(result.title)
          .setURL(result.url)
          .addField("Synopsis: ", result.synopsis)

          .addField("Airing: ", result.airing ? "Yes" : "NO", true)
          .addField("Type: ", result.type, true)
          .addField("Episodes:", result.episodes.toString(), true)
          .setThumbnail(result.image_url)
          .addField("Score: ", result.score.toString(), true)
          .addField("Start Date: ", result.start_date.substring(0, 10), true)
          .addField("End Date ", result.end_date.substring(0, 10), true)
          .setTimestamp();
        interaction.editReply({ embeds: [embed] });
      })
      .catch((error) => {
        interaction.editReply(`Error could not find ${title}`);
        console.log(error);
      });
  },
};
