const vocabButton = document.getElementById('vocab-button');
const grammarButton = document.getElementById('grammar-button');


document.addEventListener('DOMContentLoaded', function () {
    // Sample data for the chart
    const chartData = {
        labels: ['Vocabulary', 'Grammar', 'Overall'],
        datasets: [{
            label: 'Performance',
            data: [30, 50, 40],
            backgroundColor: ['#426C94', '#426C94','#FF5733'],
            borderWidth: 2,
        }]
    };

    // Get the correct chart canvas element
    const chartCanvas = document.getElementById('performance-chart').getContext('2d');

    // Create the chart with adjusted bar width
    const performanceChart = new Chart(chartCanvas, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            },
            barPercentage: 0.6,
        }
    });
});

//Vocab Button
vocabButton.addEventListener('click', function () {
    window.location.href = 'VocabularyGame/game.html';
  });

  //Grammar Button
grammarButton.addEventListener('click', function () {
    window.location.href = 'GrammarGame/grammar.html';
  });