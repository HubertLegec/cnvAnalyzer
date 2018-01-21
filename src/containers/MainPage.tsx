import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {Col, Grid, Row} from "react-bootstrap";
import {Table} from "../components/Table";
import {BarPlot} from "../components/BarPlot";
import {FloatingBarPlot} from "../components/FloatingBarPlot";
import {dataContainer} from "./App";
import {ExonDeletionsDuplications} from "../model/ExonDeletionsDuplications";
import {CnvRow} from "../utils/CnvFileReader";
import {SelectionSection} from "./SelectionSection";

interface MainPageDataProps {
    rows: CnvRow[];
    deletionsDuplications: ExonDeletionsDuplications[];
    startPosition: number;
    endPosition: number;
    selectedChromosome: string;
    selectedTrack: string;
}

interface MainPageEventProps {
    onRowClicked: (row: CnvRow) => void;
}

type MainPageProps = MainPageDataProps & MainPageEventProps;

interface MainPageState {}

export class MainPageUI extends React.Component<MainPageProps, MainPageState> {
    render() {
        const {
            rows, startPosition, endPosition, deletionsDuplications, onRowClicked
        } = this.props;
        const filteredCnvRows = this.getFilteredCnvRows();
        return <Grid style={{paddingBottom: 30}}>
            <SelectionSection />
            <Row>
                <FloatingBarPlot data={filteredCnvRows}
                                 startPosition={startPosition}
                                 endPosition={endPosition}/>
            </Row>
            <Row>
                <BarPlot data={deletionsDuplications}
                         startPosition={startPosition}
                         endPosition={endPosition}/>
            </Row>
            <Row style={{marginTop: 20}}>
                <Table rows={rows} onRowClicked={onRowClicked}/>
            </Row>
        </Grid>
    }

    private getFilteredCnvRows(): CnvRow[] {
        const {selectedChromosome, startPosition, endPosition, rows, selectedTrack} = this.props;
        return _.chain(rows)
            .filter(r => r.chromosome === selectedChromosome)
            .filter(r => selectedTrack === r.source)
            .filter(r => r.start <= endPosition && r.end >= startPosition)
            .value();
    }
}

function mapStateToProps(state: RootState): MainPageDataProps {
    const {cnvTracks} = state.cnvRows;
    const {startPosition, endPosition, selectedChromosome, selectedTrack} = state.selection;
    const chromosomes = dataContainer.chromosomes;
    const selChromosome = _.defaultTo(selectedChromosome, _.head(chromosomes));
    const selTrack = _.defaultTo(selectedTrack, _.head(cnvTracks));
    const minMax = dataContainer.getCnvsRange(selTrack, selChromosome);
    const start = startPosition || minMax.min;
    const maxRangeSize = 50000;
    const end = endPosition || (minMax.min + maxRangeSize);
    const deletionsDuplications = dataContainer.getDeletionsDuplications(selTrack, selChromosome, start, end);
    return {
        rows: dataContainer.cnvRows,
        startPosition: start,
        endPosition: end,
        selectedChromosome: selChromosome,
        selectedTrack: selTrack,
        deletionsDuplications
    };
}

function mapDispatchToProps(dispatch): MainPageEventProps {
    return {
        onRowClicked(row: CnvRow) {
            dispatch({
                type: "TABLE_ROW_CLICKED",
                row
            });
        }
    };
}

export const MainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageUI);