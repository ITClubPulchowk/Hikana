const discord = require('discord.js')

module.exports = (message) => {
    const author = {
        id: message.author.id,
        name: message.member.displayName,
    };
    const question = message.content.slice(2);
    if (!(question || message.attachments.first())) {
        console.log('bad message');
        return;
    }
    const embed = new discord.MessageEmbed();
    embed
        .setTitle(`${author.name}`)
        .setColor(`RANDOM`)
        .setDescription(question);

    if (message.attachments.first()) {
        embed.setImage(message.attachments.first().proxyURL);
    }
    const questionChannel = process.env.Q_CHANNEL;
    const reactRequired = process.env.Q_REACT;
    if (questionChannel) {
        message.react('👌');
        if (reactRequired) {
            // There is probably a better way to do this
            const filter = (reaction, user) => {
                const mods = message.guild.roles.cache
                    .get(process.env.Q_REACT_ROLE)
                    .members.map((m) => m.user.id);
                let modReactecd = false;
                if (reaction.emoji.name === '👌') {
                    for (user of reaction.users.cache.keys()) {
                        if (mods.includes(user)) {
                            modReactecd = true;
                            message.react('✅');
                            break;
                        }
                    }
                }
                return modReactecd;
            };
            const collector = message.createReactionCollector(filter, {
                time: 60000 * 2,
            });
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                if (!questions_in_question_channel.includes(message.id)) {
                    client.channels.cache.get(questionChannel).send(embed);
                    questions_in_question_channel += message.id;
                } else {
                }
            });

            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} items`);
            });
        } else {
            message.react('✅');
            client.channels.cache.get(questionChannel).send(embed);
        }
    } else {
        message.reply(
            'There seems to be a problem, can you dm a instructor or a volunteers'
        );
    }
}