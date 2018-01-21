import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {ExonDeletionsDuplications} from "../model/ExonDeletionsDuplications";

interface BarPlotProps {
    data: ExonDeletionsDuplications[];
    startPosition: number;
    endPosition: number;
    containerWidth: number;
}

interface BarPlotState {
}

class BarPlotUI extends React.Component<BarPlotProps, BarPlotState> {
    render() {
        const {containerWidth, data, startPosition, endPosition} = this.props;
        return <Plot
            data={[
                this.getDataTrace('duplications', 'Duplications', data),
                this.getDataTrace('deletions', 'Deletions', data)
            ]}
            layout={{
                title: 'CNV Counts',
                barmode: 'relative',
                width: containerWidth,
                xaxis: {
                    range: [startPosition, endPosition]
                }
            }}
        />;
    }

    private getDataTrace(fieldName: string, traceName: string, data: ExonDeletionsDuplications[]) {
        return {
            x: _.map(data, e => e.exonCenter),
            y: _.map(data, e => fieldName === 'deletions' ?  -e[fieldName] : e[fieldName]),
            text: _.map(data, e => e[`${fieldName}Text`]),
            name: traceName,
            type: 'bar'
        }
    }
}

export const BarPlot = Dimensions()(BarPlotUI);

