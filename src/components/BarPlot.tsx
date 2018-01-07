import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {CnvRow} from "../reducers/cnvRows";

export interface BarPlotDataItem {
    id: number;
    deletions: number;
    duplications: number;
}

interface BarPlotProps {
    cnvRows: CnvRow[];
}

interface BarPlotState {
}

class BarPlotUI extends React.Component<BarPlotProps, BarPlotState> {
    render() {
        const {} = this.props;
        const containerWidth = (this.props as any).containerWidth;
        return <Plot
            data={[
                this.getDataTrace('duplications', 'Duplications'),
                this.getDataTrace('deletions', 'Deletions')
            ]}
            layout={{
                barmode: 'relative',
                width: containerWidth
            }}
        />;
    }

    private getDataTrace(fieldName: string, traceName: string) {
        const data = this.calculateDeletionsAndDuplications();
        return {
            x: _.map(data, e => e.id),
            y: _.map(data, e => fieldName === 'deletions' ?  -e[fieldName] : e[fieldName]),
            name: traceName,
            type: 'bar'
        }
    }

    private calculateDeletionsAndDuplications(): BarPlotDataItem[] {
        const {cnvRows} = this.props;
        // TODO
        return [{
            id: 1,
            deletions: 2,
            duplications: 1
        }, {
            id: 2,
            deletions: 1,
            duplications: 3
        }, {
            id: 3,
            deletions: 2,
            duplications: 2
        }, {
            id: 4,
            deletions: 3,
            duplications: 1
        }];
    }
}

export const BarPlot = Dimensions()(BarPlotUI);

