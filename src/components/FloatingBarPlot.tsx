import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {FloatingBarPlotDataItem} from "../model/FloatingBarPlotDataItem";
import {CnvRow} from "../utils/CnvFileReader";


interface FloatingBarPlotProps {
    data: CnvRow[];
}

interface FloatingBarPlotState {}

class FloatingBarPlotUI extends React.Component<FloatingBarPlotProps, FloatingBarPlotState> {
    render() {
        const containerWidth = (this.props as any).containerWidth;
        const items = this.getPlotItems();
        return <Plot
            data={[
                this.getData(items)
            ]}
            layout={{
                width: containerWidth,
                height: this.getPlotHeight(items)
            }}
        />;
    }

    private getData(items: FloatingBarPlotDataItem[]) {
        return {
            type: 'bar',
            base: _.map(items, i => i.start),
            x: _.map(items, i => i.length),
            y: _.map(items, i => i.name),
            text: _.map(items, i => i.hoverText),
            orientation: 'h'
        }
    }

    private getPlotItems(): FloatingBarPlotDataItem[] {
        const {data} = this.props;
        return _.map(data, row => new FloatingBarPlotDataItem(row));
    }

    private getPlotHeight(items: FloatingBarPlotDataItem[]): number {
        const size = _.size(items);
        return size < 40 ? 400 : size * 8;
    }
}

export const FloatingBarPlot = Dimensions()(FloatingBarPlotUI);