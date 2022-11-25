import {useRouter} from 'next/router'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import {isValidQuery} from '../../utils/helpers'
import { PriceData } from '../../interfaces/assets'





  
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
  

export default function Graph({data}: { data:PriceData }) {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }
  const router = useRouter();
  let { asset } = router.query;
  let options = {}
  if (isValidQuery(asset)) {
     options = {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: ``
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
                      [0, "rgba(25,199,132,0)"],
                      [1, "rgba(255,255,255,1)"]
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
            name: `${(asset as string).charAt(0).toUpperCase()+asset?.slice(1)} to USD`,
            data
        }]
  } 
}
    return <HighchartsReact
    highcharts={Highcharts}
    options={options}
    allowChartUpdate = { true } immutable = { false }
  />;
}