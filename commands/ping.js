module.exports = {
	name: 'ping',
	args: false,
	dontShow: false,
	description: 'ping!',
	execute(message, args, client) {
		message.channel.send('pong');
	},
};
