const { nsfw_words } = require('./data.js');

module.exports = (client) => {
	client.on('message', (message) => {
		const { content } = message;
		// nsfw word check
		let re = new RegExp(nsfw_words, 'i');
		found = content.search(re);
		if (found != -1) {
			message.react('🔞');
		}
	});
	client.on('messageUpdate', (oldMessage, newMessage) => {
		const { content } = newMessage;
		// nsfw word check
		let re = new RegExp(nsfw_words, 'i');
		found = content.search(re);
		if (found != -1) {
			newMessage.react('🔞');
		} else if ((found = -1)) {
			const rxn = newMessage.reactions.cache.get('🔞');
			if (!rxn) {
				return;
			} else {
				return rxn.remove();
			}
		}
	});
};
