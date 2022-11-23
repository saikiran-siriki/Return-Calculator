import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'




type ChartData = Array<Array<[number, number]>>
  
  // export const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // };
  
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  

export default function Graph({data}: { data:ChartData }) {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }
  const options = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'BTC to USD exchange rate over time'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                  [0, "#7cb5ec"],
                  [1, "rgba(124,181,236,0)"]
              ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'USD to EUR',
        data
    }]
    
}
    return <HighchartsReact
    highcharts={Highcharts}
    options={options}
    allowChartUpdate = { false } immutable = { false }
  />;
}