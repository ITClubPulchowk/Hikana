require('dotenv').config();
const { nsfw_words } = require('./commands/data.js');

module.exports = (client, aliases, callback) => {
	if (typeof aliases === 'string') {
		aliases = [aliases];
	}
	client.on('message', (message) => {
		const { content } = message;
		aliases.forEach((alias) => {
			const command = `${process.env.PREFIX}${alias}`;

			if (content.startsWith(`${command} `) || content === command) {
				console.log(`running the command ${command}`);
				callback(message);
			}
		});
	});
};
