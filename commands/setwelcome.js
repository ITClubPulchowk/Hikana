const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const getMongoClient = require("../mongo");

module.exports = {
 data: {
    name: "setwelcome",
    description: "Sets the welcome message",
    perms: "MANAGE_GUILD",
    options: [
      {
        type: "SUB_COMMAND",
        name: "show",
        description: "Shows the current state",
        required: false,
        options: [],
      },
      {
        type: "SUB_COMMAND",
        name: "title",
        description: "Allows to change the title",
        required: false,
        options: [
          {
            type: "STRING",
            name: "new-title",
            description: "The new title",
            required: true,
          },
        ],
      },
      {
        type: "SUB_COMMAND",
        name: "description",
        description: "Allows to change the description",
        required: false,
        options: [
          {
            type: "STRING",
            name: "new-description",
            description: "The new description",
            required: true,
          },
        ],
      },
    ],
  },
  dontShow: false,
  async execute(interaction, client) {
    const type = interaction.options.getSubcommand();
    let userMessage = "";

    const mongoClient = getMongoClient();
    await interaction.deferReply();
    try {
      await mongoClient.connect();
      if (type == "show")
        await showWelcomeMessage(
          mongoClient,
          interaction.guild.id,
          interaction
        );
      else {
        if (type == "title")
          userMessage = interaction.options.getString("new-title");
        else userMessage = interaction.options.getString("new-description");
        await createWelcomeMessage(
          mongoClient,
          interaction.guild.id,
          userMessage,
          type,
          interaction
        );
      }
    } catch (e) {
      console.log(e);
    } finally {
      await mongoClient.close();
    }
  },
};

async function showWelcomeMessage(mongoClient, guildID, returnChannel) {
  const collection = await mongoClient
    .db("configs")
    .collection("welcomeMessage");
  const result = await collection.findOne({ _id: guildID });

  if (result) {
    let embed = new discord.MessageEmbed();
    embed.setTitle("Welcome message");

    console.log(result);
    if (result.title) embed.addField("Title", result.title, false);
    if (result.description)
      embed.addField("Description", result.description, false);

    await returnChannel.editReply({ embeds: [embed] });
  } else {
    await returnChannel.editReply("Message not set");
  }
}

async function createWelcomeMessage(
  mongoClient,
  guildID,
  messageContent,
  type,
  returnChannel
) {
  if (!messageContent) {
    returnChannel.editReply("You forgot to write a message baka!!");
  }
  if (!(type == "title" || type == "description"))
    returnChannel.editReply("Invalid message type");

  // Check if already in the database, if so update otherwise make a new one
  const collection = await mongoClient
    .db("configs")
    .collection("welcomeMessage");

  aMessageAlreadyExists = await collection.countDocuments(
    { _id: guildID },
    { limit: 1 }
  );

  if (aMessageAlreadyExists) {
    let doc = {};
    if (type == "title") doc["$set"] = { title: messageContent };
    else doc["$set"] = { description: messageContent };

    const result = await collection.updateOne({ _id: guildID }, doc);

    if (result.modifiedCount)
      returnChannel.editReply(
        `Welcome message ${
          type == "title" ? "title" : "description"
        } modified to: **${messageContent}**`
      );
    else returnChannel.editReply("Failed to modify welcome message");
  } else {
    let doc = { _id: guildID };
    if (type == "title") doc["title"] = messageContent;
    else doc["description"] = messageContent;

    const result = await collection.insertOne(doc);

    if (result.insertedCount)
      returnChannel.editReply(`Welcome message ${type} created`);
    else returnChannel.editReply("Failed to create welcome message");
  }
}
