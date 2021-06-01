let command_list = [
	{
		name: 'help',
		description: 'Gives you info about the commands',
		arguments: 'optional',
		usage: '',
	},
	{
		name: 'nisan',
		description: 'nisan',
		arguments: 'none',
		usage: '',
	},
	{
		name: 'wiki',
		description: 'searches wikipedia for the topic',
		arguments: 'required',
		usage: '<search-term>',
	},
	{
		name: 'intro',
		description: 'gives you the description of the server',
		arguments: 'none',
		usage: '',
	},
];

module.exports = command_list;
