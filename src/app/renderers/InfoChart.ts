import {ServerChartResponse} from "../response/ServerResponse";
import * as c3 from "c3";

export function render(chartDiv: HTMLDivElement, response: ServerChartResponse): c3.ChartAPI {
    chartDiv.innerHTML = "";
    //========================
    return c3.generate({
        bindto: "#" + chartDiv.id,
        data: {
            xs: {
                'Execution time': 'Initial count',
                'Final count': 'Initial count',
            },
            columns: [
                ['Execution time'].concat(<any[]>response.executionTimes),
                ['Initial count'].concat(<any[]>response.initialCounts),
                ['Final count'].concat(<any[]>response.finalCounts)
            ],
            type: 'spline',
            axes: {
                'Execution time': 'y',
                'Final count': 'y2'
            }
        },
        axis: {
            y: {
                label: 'Execution time in ticks'
            },
            y2: {
                label: 'Final count of the query',
                show: true
            }
        },
        tooltip: {
            format: {
                title: function (d) {
                    return 'Initial count ' + d;
                }
            }
        }
    });
}