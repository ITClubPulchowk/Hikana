const discord = require('discord.js')
const fs = require('fs')
const Jikan = require('jikan-node')
const mal = new Jikan()
const Search = require('../search.json')

module.exports = (message) => {
    let data = {
        "nothing": "nothing"
    }
    fs.writeFile('search.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        }
    })
    let embed = new discord.MessageEmbed()
    let title = ''
    let pgNo = ''
    const args = message.content.substring(process.env.PREFIX.length).split(' ')
    args.shift()
    if (args.length === 1) {
        pgNo = 1
        title = args.join(' ')
        console.log(pgNo, title);
    } else {
        pgNo = args[args.length - 1]
        args.pop()
        title = args.join(' ')
        console.log(pgNo, title);
    }
    
    mal.search('anime', title, 1).then(
        (res) => {
            data = JSON.stringify(res.results)
            fs.writeFile('search.json', data, (err) => {
                if (err) {
                    console.log(error);
                }
            })
            let pgno = parseInt(pgNo)
            if (pgno >= 5) {
                for (let i = 40; i <= 49; i++) {
                    let result = Search[i]
                    embed.addField(`${i+1}. ${result.title}`, result.synopsis)
                    .setFooter(`Page ${i} of 5`)							
                }
                message.channel.send(embed)
            } else if (pgno === 1) {
                for (let i = 0; i <= 9; i++) {
                    result = Search[i]
                    embed.addField(`${i+1}. ${result.title}`, result.synopsis)	
                    .setFooter(`Page ${pgno} of 5`)			
                }
                message.channel.send(embed)
            } else if (pgno === 2) {
                for (let i = 10; i <= 19; i++) {
                    result = Search[i]
                    embed.addField(`${i+1}. ${result.title}`, result.synopsis)
                    .setFooter(`Page ${pgno} of 5`)				
                }
                message.channel.send(embed)
            } else if (pgno === 3) {
                for (let i = 20; i <= 29; i++) {
                    result = Search[i]
                    embed.addField(`${i+1}. ${result.title}`, result.synopsis)
                    .setFooter(`Page ${pgno} of 5`)			
                }
                message.channel.send(embed)
            } else if (pgno === 4) {
                for (let i = 30; i <= 39; i++) {
                    result = Search[i]
                    embed.addField(`${i+1}. ${result.title}`, result.synopsis)
                    .setFooter(`Page ${pgno} of 5`)		
                }
                message.channel.send(embed)
            } else {
                console.log('this is not working');
            }
        } 
    ).catch(err=> console.log(err))

}