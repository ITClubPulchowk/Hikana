require('dotenv').config();
const fs = require('fs')
const path = require('path')
const discord = require('discord.js');

const editJsonFile = require('edit-json-file')
const file = editJsonFile(path.join(__dirname,'config.json'))

const commands = require('./commands.js');
const welcome = require('./welcome');

const client = new discord.Client();

client.on('ready', () => {
    console.log("the client has logged in");

    commands(client, 'ping', message => {
        message.channel.send('Pong');
    })

    commands(client, 'ban', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${tag} That user has been`)
          } else {
            message.channel.send(`${tag} Please specify someone to ban.`)
          }
        } else {
          message.channel.send(
            `${tag} You do not have permission to use this command.`
          )
        }
      })
    
    commands(client, 'kick', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('KICK_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${tag} That user has kicked`)
          } else {
            message.channel.send(`${tag} Please specify someone to kick.`)
          }
        } else {
          message.channel.send(
            `${tag} You do not have permission to use this command.`
          )
        }
      })
    
    commands(client, 'join', message => {
      client.emit('guildMemberAdd', message.member)
    })
    
    welcome(client);

    commands(client, 'msg', message => {
      const args = message.content.substring(process.env.PREFIX.length).split(" ")
      args.shift();
      file.pop("message");
      file.append("message", args.join(' '))
      file.save()
      console.log(file.get());
    })
})

client.login(process.env.BOT_TOKEN);


