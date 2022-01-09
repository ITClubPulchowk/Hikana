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
    const title = interaction.options.getString("anime-name");

    interaction.deferReply();
    mal
      .search("anime", title)
      .then((res) => {
        const result = res.results[1];
        console.log(result);
        console.log("here");
        embed
          .setTitle(result.title)
          .setURL(result.url)
          .addField("Synopsis: ", result.synopsis)

          .addField("Airing: ", result.airing ? "Yes": "NO", true)
          .addField("Type: ", result.type, true)
          .addField("Episodes:", result.episodes.toString(), true)
          .setThumbnail(result.image_url)
          .addField("Score: ", result.score.toString(), true)
          .addField("Start Date: ", result.start_date.substring(0, 10), true)
          .addField("End Date ", result.end_date.substring(0, 10), true)
          .setTimestamp();
         interaction.editReply({ embeds: [embed] });
      })
      .catch((error) => {interaction.editReply("Error"); console.log(error)});
  },
};
