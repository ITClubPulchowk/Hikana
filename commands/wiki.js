const axios = require('axios');

module.exports = {
	name: 'wiki',
	args: true,
	dontShow: false,
	description: 'Gives you a wiki link on the topic',
	execute(message, args, bot) {
		const searchWord = args.join(' ');
		const params = {
			action: 'opensearch',
			search: word,
			limit: '1',
			namespace: '0',
			format: 'json',
		};
		let url = 'https://en.wikipedia.org/w/api.php';

		if (!searchWord) {
			message.channel.send(
				`Use the correct format, baka. ${process.env.PREFIX}wiki <search-term>`
			);
		} else {
			url = url + '?origin=*';
			Object.keys(params).forEach((key) => {
				url += '&' + key + '=' + params[key];
			});

			axios(url).then((response) => {
				message.channel.send(response.data[3]);
			});
		}
	},
};
