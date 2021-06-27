const axios = require('axios');

module.exports = {
	name: 'wiki',
	args: true,
	dontShow: false,
	description: 'Gives you a wiki link on the topic',
	execute(message, args, bot) {
		let word = args.join(' ');
		if (!word) {
			message.channel.send(
				`Use the correct format, baka. ${process.env.PREFIX}wiki <search-term>`
			);
		} else {
			let url = 'https://en.wikipedia.org/w/api.php';

			let params = {
				action: 'opensearch',
				search: word,
				limit: '1',
				namespace: '0',
				format: 'json',
			};

			url = url + '?origin=*';
			Object.keys(params).forEach(function (key) {
				url += '&' + key + '=' + params[key];
			});

			axios(url).then(function (response) {
				message.channel.send(response.data[3]);
			});
		}
	},
};
