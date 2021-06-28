const discord = require('discord.js');
const Canvas = require('canvas');
const path = require('path');

const editJsonFile = require('edit-json-file');
const { isDate } = require('util');
const file = editJsonFile(path.join(__dirname, '/config.json'));

Canvas.registerFont(path.join(__dirname, '/NotoSans-Regular.ttf'), {
	family: 'fontfamily',
});

Canvas.registerFont(path.join(__dirname, '/aileron.light-italic.otf'), {
	family: 'italic fontfamily',
});

module.exports = (client) => {
	client.on('guildMemberRemove', async (member) => {
		const { guild } = member;
		const channel = member.guild.channels.cache.find(
			(ch) => ch.name === 'welcome'
		);
		if (!channel) return;

		const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');

		const background = await Canvas.loadImage('./background.png');
		let x = 0;
		let y = 0;

		context.drawImage(background, x, y, canvas.width, canvas.height);

		context.fillStyle = '#ffffff';
		context.font = '30px fontfamily';
		let text = `Welcome ${member.user.tag}`;
		x = canvas.width / 2 - context.measureText(text).width / 2;
		context.fillText(text, x, 60 + 128);

		context.font = '27px italic fontfamily';
		text = `Spread the word: Javascript Bad`;
		x = canvas.width / 2 - context.measureText(text).width / 2;
		context.fillText(text, x, 100 + 128);

		const pfp = await Canvas.loadImage(
			member.user.displayAvatarURL({ format: 'png' })
		);

		console.log(pfp.width, pfp.height);

		x = canvas.width / 2 - 128 / 2;
		y = 25;

		// Pick up the pen
		context.beginPath();
		// Start the arc to form a circle
		context.arc(350, 89, 64, 0, Math.PI * 2, true);

		context.lineWidth = 5;

		context.strokeStyle = 'white';

		context.stroke();
		// Put the pen down
		context.closePath();
		// Clip off the region you drew on
		context.clip();

		context.drawImage(pfp, x, y, 128, 128);

		const attachment = new discord.MessageAttachment(
			canvas.toBuffer(),
			'welcome-image.png'
		);

		// New memeber add
		let embed = new discord.MessageEmbed();

		embed.setTitle('Bye bye!');
		embed.setFooter('💫⭐💫');
		embed.attachFiles(attachment).setImage('attachment://welcome-image.png');
		channel.send(embed);

		// let role = member.guild.roles.cache.find(
		// 	(role) => role.name === 'Participants'
		// );
		// if (role) member.roles.add(role);
	});
};
