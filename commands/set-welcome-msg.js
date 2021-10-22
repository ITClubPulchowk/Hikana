const getMongoClient = require('../mongo');
const MongoClient = require('mongodb').MongoClient;

async function listDatabases(client) {
	const dblist = await client.db().admin().listDatabases();

	dblist.databases.forEach((db) => console.log(db.name));
}

module.exports = {
	name: 'setwelcome',
	args: true,
	dontShow: false,
	description: 'Sets a welcome message',
	async execute(message, args, client) {
		const word = args.join(' ');
		if (!message.member.hasPermission('ADMINSTRATOR')) {
			message.channel.send("You don't have the required permissions");
			return;
		}

		const mongoClient = getMongoClient();

		try {
			await mongoClient.connect();
			await listDatabases(mongoClient);
		} catch (e) {
			console.log(e);
		} finally {
			await mongoClient.close();
		}

		// mongoClient.connect((err) => {
		// 	console.log('Setting Welcome message');

		// 	const messagedb = mongoClient.db('configs').collection('welcomeMessage');
		// 	// const result = await messagedb.insertOne({
		// 	// 	_id: message.guild.id,
		// 	// 	message: message.content,
		// 	// });

		// 	messagedb
		// 		.insertOne({
		// 			_id: message.guild.id,
		// 			message: message.content,
		// 		})
		// 		.then((result) => {
		// 			if (result.insertedCount) {
		// 				console.log('Message successfully inserted');
		// 			} else {
		// 				console.log('well fk');
		// 			}

		// 			mongoClient.close();
		// 		});
		// });
	},
};
