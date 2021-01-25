'use strict';





//header stuff
const navbar = document.querySelector('.nav-transparent');
const linkItems = document.querySelectorAll('.link-item-transparent');

window.addEventListener('scroll', function () {
	const scrollHeight = window.pageYOffset;
	const navHeight =100;

	if (scrollHeight > navHeight) {
		navbar.classList.add('nav-white');
		navbar.classList.remove('nav-transparent');
		linkItems.forEach((linkItem) => {
			linkItem.classList.remove('link-item-transparent');
			linkItem.classList.add('link-item');
		});
	} else {
		navbar.classList.remove('nav-white');
		navbar.classList.add('nav-transparent');
		linkItems.forEach((linkItem) => {
			linkItem.classList.add('link-item-transparent');
			linkItem.classList.remove('link-item');
		});
	}
});




//data
import { superhero } from './superheroData.js';

let superheroNames = [];
let superheroVotes = [];

if (localStorage.getItem('superhero')) {
	const votedhero = JSON.parse(localStorage.getItem('superhero')).filter(
		(hero) => {
			return hero.vote >= 1;
		},
	);
	votedhero.forEach((hero) => {
		superheroNames.push(hero.name);
	});
} else {
	superhero.forEach((hero) => {
		superheroNames.push(hero.name);
	});
}

if (localStorage.getItem('superhero')) {
	const votedhero = JSON.parse(localStorage.getItem('superhero')).filter(
		(hero) => {
			return hero.vote >= 1;
		},
	);
	votedhero.forEach((hero) => {
		superheroVotes.push(hero.vote);
	});
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
				label: '',
				
				data: superheroVotes,
				backgroundColor:   ['var(--darkColor)' ,
                'rgba(54, 162, 235, 0.2--darkColor)',
                'rgba(255, 206, 86, 0.2--darkColor)',
                'rgba(75, 192, 192, 0.2--darkColor)',
                'rgba(153, 102, 255, 0.2--darkColor)',
                'rgba(255, 159, 64, 0.2--darkColor)'
			],

				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],

				borderWidth: 2,
				hoverborderwidth:3,
				hoverbordercolor:
				'rgba(255, 99, 132, 1)',
				
			},
		],
	},
	options: {
		legend:{
			display: false,
		},
		title: {
			display: true,
			text: 'Hero of the week',
			position: 'top',
			fontsize:25
		
			
		},
		layout:{
			padding:{
				left:50,
				right:0,
				bottom:0,
				top:0,
			}
		},
		tooltips:{
			enabled:true
		},
		
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
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

////////////////////////////////////////////////////

////////////////////////////////////////////////////////
