import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getSortedGenres} from './common.js';



export const calcChart = (statisticsCtx, state) => {
  const BAR_HEIGHT = 50;
  const {filmsPeriod} = state;
  // console.log(filmsPeriod);
  const sortGenres = getSortedGenres(filmsPeriod);

  const genreNames = [];
  const genreCounts = [];
  sortGenres.forEach(([name, count]) => {
    genreNames.push(name);
    genreCounts.push(count);
  });

  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticsCtx.height = BAR_HEIGHT * sortGenres.length;

  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genreNames,
      datasets: [{
        data: genreCounts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 24,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
