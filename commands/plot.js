require('dotenv').config();
const axios = require('axios');
const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plot')
		.setDescription('Plots something wit hthe power of wolframalpha')
		.addStringOption((string) =>
			string
				.setName('plot_string')
				.setDescription('Equation to plot')
				.setRequired(true)
		),
	dontShow: false,
	async execute(interaction, client) {
		let searchTerm = interaction.options.getString('plot_string');
		searchTerm = 'plot ' + searchTerm;

		const appID = process.env.WOLFRAM_TOKEN;
		if (!appID) {
			message.channel.send(
				'Sorry you need WOLFRAM_TOKEN for this to function correctly'
			);
		}

		let embed = new discord.MessageEmbed();

		const input = encodeURIComponent(searchTerm);
		const url = `http://api.wolframalpha.com/v2/query?input=${input}&appid=${appID}&output=json`;

		// embed.setTitle(`plotting ${searchTerm.slice(5)}`); // Slice because we added stuff to word

		interaction.deferReply();

		response = await axios(url);
		const data = response.data;
		let pods = data.queryresult.pods;
		let img;
		if (!pods) {
			embed.setTitle('Bad input, baka');
			msg.edit(embed);
			return;
		}

		// TODO: Refactor this mess
		const found = pods.find((pod) => pod.id === 'Plot');
		if (!found) {
			const imp_plot = pods.find((pod) => pod.id === 'ImplicitPlot');
			const plot_3d = pods.find((pod) => pod.id === '3DPlot');
			const result = pods.find((pod) => pod.id === 'Result');
			const surface_plot = pods.find((pod) => pod.id === 'SurfacePlot');
			const plotOfSolution = pods.find((pod) => pod.id === 'PlotOfSolutionSet');
			if (imp_plot) {
				img = imp_plot.subpods[0].img.src;
			} else if (plot_3d) {
				img = plot_3d.subpods[0].img.src;
			} else if (result) {
				img = result.subpods[0].img.src;
			} else if (surface_plot) {
				img = surface_plot.subpods[0].img.src;
			} else if (plotOfSolution) {
				img = plotOfSolution.subpods[0].img.src;
			}
		} else {
			img = found.subpods[0].img.src;
		}

		if (img) {
			embed.setTitle(`${searchTerm}`).setImage(img);
			interaction.editReply({ embeds: [embed] });
		} else {
			embed.setTitle('Bad input, baka');
			interaction.edit({ embeds: [embed] });
		}
	},
};
