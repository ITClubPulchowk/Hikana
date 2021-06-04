module.exports = (client) => {
	client.on('message', (message) => {
		if (message.mentions.members.get(client.user.id)) {
			message.channel.send(`Prefix is: ${process.env.PREFIX}`);
		}
	});
};
