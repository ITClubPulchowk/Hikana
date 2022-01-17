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
  console.log(`Logged in as ${client.user.username}`);

  const guildID = "847363596366774273";
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
			console.log(`Registered Command: ${command.data.name}`)
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
  if (interaction.content == 'good girl' || interaction.content == 'good bot') {
		interaction.channel.send(
			'https://cdn.discordapp.com/attachments/847363596815302666/901828956536324157/happy-anime-backless.gif'
		);
		return;
	}
});

/*
client.on('message', (message) => {
	// Check if self is mentioned

	// IDK why this check is here but this is necessary
	if (message.mentions.memebers) {
		if (message.mentions.members.get(client.user.id)) {
			if (!message.content.startsWith(prefix)) {
				message.channel.send(`Prefix is: ${process.env.PREFIX}`);
			}
		}
	}

	// Happy girl gif when message is "good girl"
	if (message.content == 'good girl') {
		message.channel.send(
			'https://cdn.discordapp.com/attachments/847363596815302666/901828956536324157/happy-anime-backless.gif'
		);
		return;
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command_name = args.shift().toLowerCase();

	if (!client.commands.has(command_name)) {
		message.channel.send(
			`Hmm I dont seem to have this command, ${message.author}, type ${prefix}help to get a list of the commands`
		);
		message.channel.send(
			'You can post about it in feature request if you want the feature to be added'
		);
		return;
	}
	const command = client.commands.get(command_name);
	if (command.args && !args.length) {
		return message.channel.send(
			`You forgot the arguments ${message.author}, baka!`
		);
	}

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
*/
client.login(process.env.BOT_TOKEN);
