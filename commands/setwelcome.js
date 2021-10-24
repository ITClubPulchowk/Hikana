const getMongoClient = require('../mongo');
const discord = require('discord.js');

module.exports = {
	name: 'setwelcome',
	args: true,
	dontShow: false,
	description: 'Sets a welcome message',
	usage: 'show || title <message> || description <message>',
	async execute(message, args, client) {
		const type = args[0];
		args.shift();

		const userMessage = args.join(' ');
		if (!message.member.hasPermission('ADMINSTRATOR')) {
			message.channel.send("You don't have the required permissions");
			return;
		}

		const mongoClient = getMongoClient();

		try {
			await mongoClient.connect();
			if (type == 'show')
				await showWelcomeMessage(
					mongoClient,
					message.guild.id,
					message.channel
				);
			else
				await createWelcomeMessage(
					mongoClient,
					message.guild.id,
					userMessage,
					type,
					message.channel
				);
		} catch (e) {
			console.log(e);
		} finally {
			await mongoClient.close();
		}
	},
};

async function showWelcomeMessage(mongoClient, guildID, returnChannel) {
	const collection = await mongoClient
		.db('configs')
		.collection('welcomeMessage');
	const result = await collection.findOne({ _id: guildID });

	if (result) {
		let embed = new discord.MessageEmbed();
		embed.setTitle('Welcome message');

		if (result.title) embed.addField('Title', result.title, false);
		if (result.description)
			embed.addField('Description', result.description, false);

		returnChannel.send(embed);
	} else {
		returnChannel.send('Message not set');
	}
}

async function createWelcomeMessage(
	mongoClient,
	guildID,
	messageContent,
	type,
	returnChannel
) {
	if (!messageContent) {
		returnChannel.send('You forgot to write a message baka!!');
	}
	if (!(type == 'title' || type == 'description'))
		returnChannel.send('Invalid message type');

	// Check if already in the database, if so update otherwise make a new one
	const collection = await mongoClient
		.db('configs')
		.collection('welcomeMessage');

	aMessageAlreadyExists = await collection.countDocuments(
		{ _id: guildID },
		{ limit: 1 }
	);

	if (aMessageAlreadyExists) {
		let doc = {};
		if (type == 'title') doc['$set'] = { title: messageContent };
		else doc['$set'] = { description: messageContent };

		const result = await collection.updateOne({ _id: guildID }, doc);

		if (result.modifiedCount)
			returnChannel.send(
				`Welcome message ${type == 'title' ? 'title' : 'description'} modified`
			);
		else returnChannel.send('Failed to modify welcome message');
	} else {
		let doc = { _id: guildID };
		if (type == 'title') doc['title'] = messageContent;
		else doc['description'] = messageContent;

		const result = await collection.insertOne(doc);

		if (result.insertedCount)
			returnChannel.send(`Welcome message ${type} created`);
		else returnChannel.send('Failed to create welcome message');
	}
}
