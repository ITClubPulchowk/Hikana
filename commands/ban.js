const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans number of the server")
    .addMentionableOption((mention) =>
      mention
        .setName("mention")
        .setDescription("User whom to bad")
        .setRequired(true)
    )
    .addStringOption((string) =>
      string
        .setName("reason")
        .setDescription("Reason for ban")
        .setRequired(false)
    ),
  dontShow: false,
  async execute(interaction) {
    const reason = interaction.options.getString("reason");
    const guildMemeber = await interaction.guild.members.fetch(
      interaction.user.id
    );
    if (
      guildMemeber.permissions.has("ADMINISTRATOR") ||
      guildMemeber.permissions.has("BAN_MEMBERS")
    ) {
      target = interaction.options.getMentionable("mention");
      if (target.user) {
        target
          .ban({
            days: 7,
            reason: reason ? reason : "Bad boi",
          })
          .then(() => interaction.reply(`Banned user: ${target.user.username}. Reason: ${reason}`));
      } else {
        interaction.reply("Cound not find the user");
      }
    }
  },
};
/*

module.exports = {
  name: "ban",
  args: true,
  dontShow: false,
  usage: "<@member>",
  description: "bans member of the server",
  execute(message, notArgs, client) {
    const { member, mentions } = message;

    const tag = `<@${member.id}>`;

    if (
      member.hasPermission("ADMINISTRATOR") ||
      member.hasPermission("BAN_MEMBERS")
    ) {
      const args = message.content
        .substring(process.env.PREFIX.length)
        .split(" ");
      args.shift();
      const userToBan = args[0];
      console.log(userToBan);
      if (typeof userToBan === "string") {
        const target = mentions.users.first();
        if (target) {
          const targetMember = message.guild.members.cache.get(target.id);
          targetMember.ban();
          message.channel.send(`${tag} That user was banned`);
        } else if (!target) {
          const targetMember = message.guild.members.cache.get(userToBan);
          targetMember.ban();
          message.channel.send(`<@${tag}> That user was banned`);
        }
      } else if (typeof userToBan === "undefined") {
        message.channel.send(`${tag} Please specify someone to ban.`);
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      );
    }
  },
};
*/
