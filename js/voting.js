'use strict';

///////// chart /////////

var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Votes',
            data: [12, 19, -3, 5, -2, 3],
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

/////////////////// function  for chart /////////////////////////


//////// function add new data ////////
function addData(chart) {
    chart.data.labels.push(document.getElementById("category").value);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(document.getElementById("votes").value * 1);
    });
    chart.update();
}
//////////////////////////////////////

/////// function remove data ////////
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
////////////////////////////////////

////// function +++ same data //////
function myVote(chart){
    let voteIndex = chart.data.labels.indexOf(document.getElementById('category').value);
    chart.data.datasets[0].data[voteIndex] += 1;
    chart.update();
}
////////////////////////////////////

////////////////////////////////////////////////////////