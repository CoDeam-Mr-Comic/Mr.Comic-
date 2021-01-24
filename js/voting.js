'use strict';

//data 
import {superhero} from './superheroData.js'


let superheroNames = [];
let superheroVotes = [];

if(localStorage.getItem('superhero')) {
    const votedhero = JSON.parse(localStorage.getItem('superhero')).filter((hero) => {
        return hero.vote >= 1;    
    });
    console.log(votedhero);
    votedhero.forEach((hero) =>{
        superheroNames.push(hero.name)
    })
} else {
    superhero.forEach((hero) => {
        superheroNames.push(hero.name)
    });
}

if(localStorage.getItem('superhero')) {

    JSON.parse(localStorage.getItem('superhero')).forEach((hero) => {
        superheroVotes.push(hero.vote);
    })
} else {
    superhero.forEach((hero) => {
        superheroVotes.push(hero.vote)
    });
}



///////// chart /////////

var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: superheroNames,
        datasets: [{
            label: 'Votes',
            data: superheroVotes,
            backgroundColor:
            function(context) {
                var index = context.dataIndex;
                var value = context.dataset.data[index];
                return value < 0 ? 'red' :  // draw negative values in red
                    index % 2 ? 'blue' :    // else, alternate values in blue and green
                    'green';
            },

            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],

            borderWidth: 1

        }]

    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title:{
          display: true,
          text: 'Hero of the week',
          position: 'top',
        

        },
         animation: {
             duration: 3000,
             easing: 'easeInQuint'
         }
    }
});

////////////////////////////////////////////////////


////////////////////////////////////////////////////////