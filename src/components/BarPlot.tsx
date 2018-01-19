import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {CnvRow, StructureRow, CnvType, ExonDef} from "../reducers/cnvRows";
import {BarPlotDataItem} from "../model/BarPlotDataItem";

interface BarPlotProps {
    cnvRows: CnvRow[];
    structureRows: StructureRow[];
    startPosition: number;
    endPosition: number;
}

interface BarPlotState {
}

class BarPlotUI extends React.Component<BarPlotProps, BarPlotState> {
    render() {
        const {} = this.props;
        const containerWidth = (this.props as any).containerWidth;
        const data = this.calculateDeletionsAndDuplications();
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

    private getDataTrace(fieldName: string, traceName: string, data: BarPlotDataItem[]) {
        return {
            x: _.map(data, e => e.exonCenter),
            y: _.map(data, e => fieldName === 'deletions' ?  -e[fieldName] : e[fieldName]),
            name: traceName,
            type: 'bar'
        }
    }

    private calculateDeletionsAndDuplications(): BarPlotDataItem[] {
        const {structureRows, startPosition, endPosition} = this.props;
        return _.chain(structureRows)
            .map(r => r.exons)
            .flatten()
            .filter(e => e.start <= endPosition && e.end >= startPosition)
            .map(e => this.calculateDeletionsAndDuplicationsForExon(e))
            .value();
    }

    private calculateDeletionsAndDuplicationsForExon(exon: ExonDef): BarPlotDataItem {
        const {cnvRows} = this.props;
        const result = new BarPlotDataItem(exon.start, exon.end);
        _(cnvRows)
            .filter(r => r.start <= exon.end && r.end >= exon.start)
            .forEach(r =>
               r.type === CnvType.DUPLICATION ? result.addDuplication() : result.addDeletion()
            );
        return result;
    }
}

export const BarPlot = Dimensions()(BarPlotUI);

