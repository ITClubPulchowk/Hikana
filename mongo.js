require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

function getMongoClient() {
	const dbPassword = process.env.MONGODB_PASSWORD;
	const dbUser = process.env.MONGODB_USER;
	const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.cmyzu.mongodb.net/configs?retryWrites=true&w=majority`;
	const mongoClient = new MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	return mongoClient;
}
module.exports = getMongoClient;
