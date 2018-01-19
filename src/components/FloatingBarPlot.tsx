import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {CnvRow} from "../reducers/cnvRows";

export interface FloatingBarPlotDataItem {
    name: string;
    start: number;
    end: number;
}

interface FloatingBarPlotProps {
    data: CnvRow[];
}

interface FloatingBarPlotState {}

class FloatingBarPlotUI extends React.Component<FloatingBarPlotProps, FloatingBarPlotState> {
    render() {
        const containerWidth = (this.props as any).containerWidth;
        return <Plot
            data={[
                this.getData()
            ]}
            layout={{
                width: containerWidth,
            }}
        />;
    }

    private getData() {
        const {data} = this.props;
        return {
            type: 'bar',
            base: _.map(data, e => e.start),
            x: _.map(data, e => e.end - e.start),
            y: _.map(data, e => e.bin), // TODO - change to appropriate name
            orientation: 'h'
        }
    }
}

export const FloatingBarPlot = Dimensions()(FloatingBarPlotUI);