const discord = require("discord.js");
const Canvas = require("canvas");
const path = require("path");
const getMongoClient = require("./mongo");

const editJsonFile = require("edit-json-file");
const { isDate } = require("util");
const file = editJsonFile(path.join(__dirname, "/config.json"));

Canvas.registerFont(path.join(__dirname, "/NotoSans-Regular.ttf"), {
  family: "fontfamily",
});

Canvas.registerFont(path.join(__dirname, "/aileron.light-italic.otf"), {
  family: "italic fontfamily",
});

module.exports = async (client) => {
  client.on("guildMemberAdd", async (member) => {
    const { guild } = member;
    const channel = member.guild.channels.cache.find(
      (ch) => ch.name === "welcome"
    );
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");

    const background = await Canvas.loadImage("./background.png");
    let x = 0;
    let y = 0;

    context.drawImage(background, x, y, canvas.width, canvas.height);

    context.fillStyle = "#ffffff";
    context.font = "30px fontfamily";
    let text = `Welcome ${member.user.tag}`;
    x = canvas.width / 2 - context.measureText(text).width / 2;
    context.fillText(text, x, 60 + 128);

    context.font = "27px italic fontfamily";
    text = `Member #${guild.memberCount}`;
    x = canvas.width / 2 - context.measureText(text).width / 2;
    context.fillText(text, x, 100 + 128);

    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "png" })
    );

    console.log(pfp.width, pfp.height);

    x = canvas.width / 2 - 128 / 2;
    y = 25;

    // Pick up the pen
    context.beginPath();
    // Start the arc to form a circle
    context.arc(350, 89, 64, 0, Math.PI * 2, true);

    context.lineWidth = 5;

    context.strokeStyle = "white";

    context.stroke();
    // Put the pen down
    context.closePath();
    // Clip off the region you drew on
    context.clip();

    context.drawImage(pfp, x, y, 128, 128);

    const attachment = new discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );

    channel.send(`${file.get().message}, ${member}!`);

    // New memeber add
    let embed = new discord.MessageEmbed();
    // const discordNewbie = member.guild.channels.cache.find(
    // 	(ch) => ch.name === 'discord-newbie'
    // );
    // const getRoles = member.guild.channels.cache.find(
    // 	(ch) => ch.name === 'get-roles'
    // );
    // const aboutServer = member.guild.channels.cache.find(
    // 	(ch) => ch.name === 'about'
    // );
    // const chat = member.guild.channels.cache.find((ch) => ch.name === 'chat');
    // embed.setTitle('Welcome to C Workshop server\n');
    // // embed.setAuthor(client.user.username, client.user.avatarURL(32));
    // embed.setDescription(
    // 	`If you are new to discord visit <#${discordNewbie.id}> channel and then visit <#${getRoles.id}>
    //         Read about the server in <#${aboutServer.id}> and be sure to send your first message in <#${chat.id}>
    //         `
    // );

    const titleAndDescription = await getTitleAndDescription(
      member.guild.id,
      member.guild.name
    );

    embed.setTitle(titleAndDescription.title);
    // embed.setAuthor(client.user.username, client.user.avatarURL(32));
    embed.setDescription(titleAndDescription.description);
    embed.setFooter("💫⭐💫");
    //embed.attachFiles(attachment).setImage("attachment://welcome-image.png");
    channel.send({ embeds: [embed], files: [attachment] });

    // let role = member.guild.roles.cache.find(
    // 	(role) => role.name === 'Participants'
    // );
    // if (role) member.roles.add(role);
  });
};

async function getTitleAndDescription(guildID, guildName) {
  const mongoClient = getMongoClient();

  try {
    await mongoClient.connect();

    const collection = await mongoClient
      .db("configs")
      .collection("welcomeMessage");
    const result = await collection.findOne({ _id: guildID });
    titleAndDescription = {};
    console.log(result);

    if (result) {
      titleAndDescription["title"] = (await result.title)
        ? result.title
        : "Hello";
      titleAndDescription["description"] = (await result.description)
        ? result.description
        : `Welcome to ${guildName}, hope you have a nice time here`;
    } else {
      titleAndDescription["title"] = "Hello";
      titleAndDescription[
        "description"
      ] = `Welcome to ${guildName}, hope you have a nice time here`;
    }
  } catch (e) {
    console.log(e);
  } finally {
    await mongoClient.close();
  }
  return await titleAndDescription;
}
