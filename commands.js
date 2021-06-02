require('dotenv').config();
const { nsfw_words } = require('./data.js');

module.exports = (client, aliases, callback) => {
	if (typeof aliases === 'string') {
		aliases = [aliases];
	}
	client.on('message', (message) => {
		const { content } = message;

		// nsfw word check
		let re = new RegExp(nsfw_words, 'i');
		found = content.search(re);
		if (found != -1) {
			message.react('🔞');
		}

		aliases.forEach((alias) => {
			const command = `${process.env.PREFIX}${alias}`;

			if (content.startsWith(`${command} `) || content === command) {
				console.log(`running the command ${command}`);
				callback(message);
			}
		});
	});
};
