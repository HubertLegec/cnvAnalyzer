import * as _ from "lodash";
import * as React from "react";
import * as Plot from "react-plotly.js"
import * as Dimensions from 'react-dimensions'
import {CnvRow, StructureRow, CnvType} from "../reducers/cnvRows";

export interface BarPlotDataItem {
    //id: number;
    exonStart: number;
    exonEnd: number;
    deletions: number;
    duplications: number;
}

interface BarPlotProps {
    cnvRows: CnvRow[];
    structureRows: StructureRow[]
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
        const data = this.calculateDeletionsAndDuplications(800000, 1000000);
        return {
            x: _.map(data, e => e.exonEnd-(e.exonEnd-e.exonStart)/2),
            y: _.map(data, e => fieldName === 'deletions' ?  -e[fieldName] : e[fieldName]),
            name: traceName,
            type: 'bar'
        }
    }

    //zakładając, że dane są uporządkowane
    private calculateDeletionsAndDuplications(start, stop): BarPlotDataItem[] {
        const {cnvRows, structureRows} = this.props;
        // TODO
        let result : BarPlotDataItem[] = [];

        for(var i = 0; i <  structureRows.length-1; ++i)
        {
            if(structureRows[i].exons[0].start < start)
                continue;
            else if (structureRows[i].exons[0].end > stop)
                break;
                //continue; 

            for(var j = 0; j < structureRows[i].exons.length-1; ++j)
            {
                result.push({
                    deletions: 0,
                    duplications: 0,
                    exonStart: structureRows[i].exons[j].start,
                    exonEnd: structureRows[i].exons[j].end
                });
            }
        }

        for(var i = 0; i < cnvRows.length-1; ++i)
        {
            if(cnvRows[i].end < start)
                continue;
            else if(cnvRows[i].start > stop)
                break;
            for(var j = 0; j < result.length-1; ++j)
            {
                if(cnvRows[i].start <= result[j].exonStart && cnvRows[i].end >= result[j].exonEnd)
                    if(cnvRows[i].type == CnvType.DELETION)
                        result[j].deletions += 1;
                    else
                        result[j].duplications += 1;
            }
        }

        return result;
    }
}

export const BarPlot = Dimensions()(BarPlotUI);

