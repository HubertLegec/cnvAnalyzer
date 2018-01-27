import * as React from "react";
import * as _ from "lodash";
import * as Plot from "react-plotly.js";
import * as Dimensions from 'react-dimensions';
import {GeneDescription} from "../model/GeneDescription";

interface GenePlotProps {
    data: GeneDescription[];
    startPosition: number;
    endPosition: number;
    containerWidth: number;
}

class GenePlotUI extends React.Component<GenePlotProps> {
    render() {
        const {containerWidth, startPosition, endPosition} = this.props;

        return <Plot
            data={[
                this.getData()
            ]}
            layout={{
                title: "Genes",
                width: containerWidth,
                height: this.getPlotHeight(),
                xaxis: {
                    range: [startPosition, endPosition]
                }
            }}/>;
    }

    private getData() {
        const {data} = this.props;
        return {
            type: 'bar',
            base: _.map(data, i => i.start),
            x: _.map(data, i => i.length),
            y: _.map(data, i => i.name),
            text: _.map(data, i => i.hoverText),
            orientation: 'h'
        }
    }

    private getPlotHeight(): number {
        const {data} = this.props;
        const size = _.size(data);
        return size < 40 ? 400 : size * 8;
    }
}

export const GenePlot = Dimensions()(GenePlotUI);