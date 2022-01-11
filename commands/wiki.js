const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Searches wikipidia")
    .addStringOption((string) => {
      return string
        .setName("search_string")
        .setDescription("String to searc the wiki")
        .setRequired(true);
    }),
  dontShow: false,
  async execute(interaction, client) {
    const searchWord = interaction.options.getString("search_string");
    const params = {
      action: "opensearch",
      search: searchWord,
      limit: "1",
      namespace: "0",
      format: "json",
    };
    let url = "https://en.wikipedia.org/w/api.php";

    if (!searchWord) {
      message.channel.send(
        `Use the correct format, baka. ${process.env.PREFIX}wiki <search-term>`
      );
    } else {
      url = url + "?origin=*";
      Object.keys(params).forEach((key) => {
        url += "&" + key + "=" + params[key];
      });

      response = await axios(url);
      if (await response) {
        await interaction.reply({ content: response.data[3][0] || 'Article not found' });
      } else await interaction.reply({ content: "Search Failed" });
    }
  },
};
