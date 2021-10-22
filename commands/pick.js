module.exports = {
	name: 'pick',
	args: false,
	dontShow: false,
	description: 'A random number picker',
	execute(message, args, client) {
		/*
		pick 1 5 6 ; randomly picks either 5 or 6
		pick 2 5 6 ; returns 5 and 6
		pick 2 a b c d; randomly picks any three
		pick 2 [-7 25]; picks 2 numbers between -7 and 25 randomly
		*/

		if (args.length < 1) {
			message.channel.send(
				'Insuffient Arguemnts BAKA \nUse **!help pick** for more info'
			);
			return;
		}
		numberOfPicks = parseInt(args[0]);
		if (isNaN(numberOfPicks)) {
			message.channel.send(
				'The first argument must be a number \nUse **!help pick** for more info'
			);
			return;
		}

		args.shift();
		tosend = [];

		// Check if long pattern
		// [-4, 1] like pattern
		const re = /\[(-?\d+)\s?,\s?(-?\d+)\]/;
		const nums = re.exec(args.join(' '));
		if (nums) {
			const start = parseInt(nums[1]);
			const end = parseInt(nums[2]);
			const arrOfRangeOfNumbers = Array.from(
				{ length: end - start },
				(_, i) => i + start
			);

			while (arrOfRangeOfNumbers.length != 0 && numberOfPicks != 0) {
				const randomElement =
					arrOfRangeOfNumbers[
						Math.floor(Math.random() * arrOfRangeOfNumbers.length)
					];
				tosend.push(randomElement);

				const index = arrOfRangeOfNumbers.indexOf(randomElement);
				if (index > -1) {
					arrOfRangeOfNumbers.splice(index, 1);
				}
				numberOfPicks--;
			}
		} else {
			while (args.length != 0 && numberOfPicks != 0) {
				const randomElement = args[Math.floor(Math.random() * args.length)];
				tosend.push(randomElement);

				const index = args.indexOf(randomElement);
				if (index > -1) {
					args.splice(index, 1);
				}
				numberOfPicks--;
			}
		}
		let msg = `I pick: `;
		for (let i = 0; i < tosend.length; i++) {
			if (i != tosend.length) msg += `${tosend[i]}, `;
			else msg += `${tosend[i]}`;
		}
		message.channel.send(msg);
	},
};
