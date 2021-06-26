require('dotenv').config()
const Jikan = require('jikan-node')
const mal = new Jikan()

const discord = require('discord.js')

module.exports = (message) => {
    const embed = new discord.MessageEmbed()
		const args = message.content.substring(process.env.length).split(' ')
		args.shift()
		const title = args.join(' ')
		mal.search('anime', title).then(		
			(res) => {
				const result = res.results[1]
				embed.setTitle(result.title)
				.setURL(result.url)
				.addField('Synopsis: ', result.synopsis)
				.addField('Airing: ', result.airing, true)
				.addField('Type: ', result.type, true)
				.addField('Episodes:', result.episodes, true)
				.setThumbnail(result.image_url)
				.addField('Score: ', result.score, true)
				.addField('Start Date: ', result.start_date.substring(0, 10), true)
				.addField('End Date ', result.end_date.substring(0, 10), true)
				.setTimestamp()
				message.channel.send(embed)
			})
		.catch( (error) => console.log(error))

}