import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js";
import * as Dimensions from 'react-dimensions';
import {FloatingBarPlotDataItem} from "../model/FloatingBarPlotDataItem";
import {CnvRow, CnvType} from "../utils/CnvFileReader";


interface FloatingBarPlotProps {
    data: CnvRow[];
    startPosition: number;
    endPosition: number;
    containerWidth: number;
}

interface FloatingBarPlotState {}

class FloatingBarPlotUI extends React.Component<FloatingBarPlotProps, FloatingBarPlotState> {
    render() {
        const {containerWidth, startPosition, endPosition} = this.props;
        const items = this.getPlotItems();
        return <Plot
            data={[
                this.getData(items)
            ]}
            layout={{
                width: containerWidth,
                height: this.getPlotHeight(items),
                xaxis: {
                    range: [startPosition, endPosition]
                }
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
            orientation: 'h',
            marker: {
                color: _.map(items, i => i.cnvType === CnvType.DELETION ? 'rgb(254, 127, 40)' : 'rgb(38, 120, 178)')
            }
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