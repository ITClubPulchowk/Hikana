const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pick')
		.setDescription('A random number picker')
		.addIntegerOption((integer) =>
			integer
				.setName('num_of_picks')
				.setDescription('Number of items to pick from **choices**')
				.setRequired(true)
		)
		.addStringOption((string) =>
			string
				.setName('choices')
				.setDescription('Choices separated by spaces')
				.setRequired(true)
		),
	dontShow: false,
	async execute(interaction, client) {
		let numberOfPicks = interaction.options.getInteger('num_of_picks');

		tosend = [];
		let pickOptions = interaction.options.getString('choices').split(' ');

		// Check if long pattern
		// [-4, 1] like pattern
		const re = /\[(-?\d+)\s?,\s?(-?\d+)\]/;
		const nums = re.exec(pickOptions.join(' '));
		if (nums) {
			const start = parseInt(nums[1]);
			const end = parseInt(nums[2]) + 1;
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
			while (pickOptions.length != 0 && numberOfPicks != 0) {
				const randomElement =
					pickOptions[Math.floor(Math.random() * pickOptions.length)];
				tosend.push(randomElement);

				const index = pickOptions.indexOf(randomElement);
				if (index > -1) {
					pickOptions.splice(index, 1);
				}
				numberOfPicks--;
			}
		}
		let msg = `I pick: `;
		for (let i = 0; i < tosend.length; i++) {
			if (i != tosend.length - 1) msg += `${tosend[i]}, `;
			else msg += `${tosend[i]}`;
		}
		interaction.reply(msg);
	},
};
