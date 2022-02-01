require("dotenv").config();
const discord = require("discord.js");
const getMongoClient = require("./mongo");

const fs = require("fs");

const nsfwCheck = require("./events/nsfw-check.js");
const welcome = require("./welcome");
const byebye = require("./byebye");
const spamCheck = require("./events/spam-check.js");

const client = new discord.Client({
  intents: [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_MEMBERS,
    discord.Intents.FLAGS.GUILD_INVITES,
  ],
});

client.login(process.env.BOT_TOKEN).then(() => {
  client.application.commands.set([]);
});
client.commands = new discord.Collection();

// Loads up all the commands from commands directory
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command.data) {
    client.commands.set(command.data.name, command);
  }
}

client.once("ready", () => {
  client.application.commands.set([]);
  console.log(`Logged in as ${client.user.username}`);

  const guildID = "";
  const guild = client.guilds.cache.get(guildID);

  let commands;
  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data) {
      commands.create(command.data);
      console.log(`Registered Command: ${command.data.name}`);
    }
  }

  welcome(client);
  nsfwCheck(client);
  spamCheck(client);
  byebye(client);

  const mongoClient = getMongoClient();
  mongoClient.connect(() => {
    console.log("connected to db");
    mongoClient.close();
  });
});

// Updating to version 13
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  const command = client.commands.get(commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.on("messageCreate", async (interaction) => {
  if (interaction.content == "good girl" || interaction.content == "good bot") {
    console.log(interaction);
    interaction.channel.send(
      "https://cdn.discordapp.com/attachments/847363596815302666/901828956536324157/happy-anime-backless.gif"
    );
    return;
  }
  if (interaction.author) {
    if (interaction.author.id == "350940972668157952") {
      const id = interaction.id;
      const msg = await interaction.channel.messages.fetch(id);
      const reactionEmoji = msg.guild.emojis.cache.find(
        (emoji) => emoji.name === "python"
      );
      if (reactionEmoji) msg.react(reactionEmoji);
    }
  }
});
