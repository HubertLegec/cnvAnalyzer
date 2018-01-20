import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {ExonDeletionsDuplications} from "../model/ExonDeletionsDuplications";

interface BarPlotProps {
    data: ExonDeletionsDuplications[];
    startPosition: number;
    endPosition: number;
}

interface BarPlotState {
}

class BarPlotUI extends React.Component<BarPlotProps, BarPlotState> {
    render() {
        const {data} = this.props;
        const containerWidth = (this.props as any).containerWidth;
        return <Plot
            data={[
                this.getDataTrace('duplications', 'Duplications', data),
                this.getDataTrace('deletions', 'Deletions', data)
            ]}
            layout={{
                title: 'CNV Counts',
                barmode: 'relative',
                width: containerWidth
            }}
        />;
    }

    private getDataTrace(fieldName: string, traceName: string, data: ExonDeletionsDuplications[]) {
        return {
            x: _.map(data, e => e.exonCenter),
            y: _.map(data, e => fieldName === 'deletions' ?  -e[fieldName] : e[fieldName]),
            name: traceName,
            type: 'bar'
        }
    }
}

export const BarPlot = Dimensions()(BarPlotUI);

