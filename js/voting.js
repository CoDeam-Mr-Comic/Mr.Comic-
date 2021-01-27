'use strict';

//data
import { superhero } from './superheroData.js';

let superheroNames = [];
let superheroVotes = [];

const heroOfWeek = document.querySelector('.week-hero');
const mystery = document.querySelector('.mystery');
var chart = document.querySelector('.size-chart');

if (localStorage.getItem('superhero')) {
	const votedhero = JSON.parse(localStorage.getItem('superhero')).filter(
		(hero) => {
			return hero.vote > 0;
		},
	);
	votedhero.sort((a, b) => {
		return b.vote - a.vote;
	});

	if (votedhero.length < 5) {
		for (let i = 0; i < votedhero.length; i++) {
			superheroNames.push(votedhero[i].name);
		}
	} else {
		for (let i = 0; i < 5; i++) {
			superheroNames.push(votedhero[i].name);
		}
	}

	if (superheroNames.length === 0) {
		mystery.innerHTML = `<img src='utilityImg/mystery.jpg' alt='mystery'> `;
		chart.classList.add('hide');
	} else {
		heroOfWeek.innerHTML = `<img src=${votedhero[0].src} alt=${votedhero[0].name} title=${votedhero[0].name}> `;
		chart.classList.remove('hide');
		mystery.classList.add('hide');
	}

} else {
	superhero.forEach((hero) => {
		superheroNames.push(hero.name);
	});
}

if (localStorage.getItem('superhero')) {
	const votedhero = JSON.parse(localStorage.getItem('superhero')).filter(
		(hero) => {
			return hero.vote > 0;
		},
	);
	votedhero.sort((a, b) => {
		return b.vote - a.vote;
	});

	if (votedhero.length < 5) {
		for (let i = 0; i < votedhero.length; i++) {
			superheroVotes.push(votedhero[i].vote);
		}
	} else {
		for (let i = 0; i < 5; i++) {
			superheroVotes.push(votedhero[i].vote);
		}
	}
} else {
	superhero.forEach((hero) => {
		superheroVotes.push(hero.vote);
	});
}

///////// chart /////////

var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontFamily = 'lato';
Chart.defaults.global.defaultFontsize = 18;
Chart.defaults.global.defaultFontcolor = '#777';

var myChart = new Chart(ctx, {
	type: 'horizontalBar',
	data: {
		labels: superheroNames,
		datasets: [
			{
				label: 'votes',
				data: superheroVotes,
				backgroundColor: [
					'rgb(0, 123, 196)',
					'rgb(250, 185, 47)',
					'rgb(0, 21, 70)',
					'rgb(121, 187, 121)',
					'rgb(160, 3, 3)',
				],
				hoverBorderWidth: 5,
				hoverBorderColor: ['blue', 'yellow', 'blue', 'green', 'red'],
			},
		],
	},
	options: {
		legend: {
			display: false,
		},
		title: {
			display: true,
			text: 'Hero of the week',
			position: 'top',
			fontSize: 25,
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				bottom: 0,
				top: 0,
			},
		},
		tooltips: {
			enabled: true,
		},

		scales: {
			xAxes: [
				{
					ticks: {
						display: false,
						beginAtZero: true,
					},
					gridLines: {
						color: 'rgba(0, 0, 0, 0)',
					},
				},
			],
			yAxes: [
				{
					barPercentage: 0.6,
					gridLines: {
						color: 'rgba(0, 0, 0, 0)',
					},
					ticks: {
						fontSize: 30,
						padding: 20,
					},
				},
			],
		},
		animation: {
			duration: 3000,
			easing: 'easeInQuint',
		},
	},
});
