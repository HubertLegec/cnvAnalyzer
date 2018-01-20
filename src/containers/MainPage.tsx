import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {Col, Grid, Row} from "react-bootstrap";
import {Table} from "../components/Table";
import {BarPlot} from "../components/BarPlot";
import {FloatingBarPlot} from "../components/FloatingBarPlot";
import {dataContainer} from "./App";
import {ChromosomeSelector} from "../components/ChromosomeSelector";
import {DataTrackSelector} from "../components/DataTrackSelector";
import {RangeSelector} from "../components/RangeSelector";
import {ExonDeletionsDuplications} from "../model/ExonDeletionsDuplications";
import {StructureRow} from "../utils/StructureFileReader";
import {CnvRow} from "../utils/CnvFileReader";

interface MainPageDataProps {
    rows: CnvRow[];
    deletionsDuplications: ExonDeletionsDuplications[];
    startPosition: number;
    endPosition: number;
    selectedChromosome: string;
    chromosomes: string[];
    tracks: string[];
    selectedTrack: string;
}

interface MainPageEventProps {
    onChangeChromosome: (chromosome: string) => void;
    onChangeTrack: (track: string) => void;
}

type MainPageProps = MainPageDataProps & MainPageEventProps;

interface MainPageState {}

export class MainPageUI extends React.Component<MainPageProps, MainPageState> {
    render() {
        const {
            rows, startPosition, endPosition, selectedChromosome, chromosomes, onChangeChromosome,
            tracks, selectedTrack, onChangeTrack, deletionsDuplications
        } = this.props;
        const filteredCnvRows = this.getFilteredCnvRows();
        return <Grid style={{paddingBottom: 30}}>
            <Row style={{marginBottom: 30}}>
                <Col xs={2} md={2} style={{verticalAlign: 'center', textAlign: 'right', fontSize: 16, marginTop: 5}}>
                    Select chromosome
                </Col>
                <Col xs={4} md={4}>
                    <ChromosomeSelector selectedChromosome={selectedChromosome}
                                        chromosomes={chromosomes}
                                        onChange={onChangeChromosome}/>
                </Col>
                <Col xs={2} md={2} style={{verticalAlign: 'center', textAlign: 'right', fontSize: 16, marginTop: 5}}>
                    Select data track
                </Col>
                <Col xs={4} md={4}>
                    <DataTrackSelector tracks={tracks} selectedTrack={selectedTrack} onChange={onChangeTrack}/>
                </Col>
            </Row>
            <Row style={{marginBottom: 20}}>
                <Col xs={2} md={2} style={{verticalAlign: 'center', textAlign: 'right', fontSize: 16}}>
                    Select positions range
                </Col>
                <Col xs={10} md={10}>
                    <RangeSelector />
                </Col>
            </Row>
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
                <Table rows={rows}/>
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
    const maxRangeSize = 100000;
    const end = endPosition || (minMax.min + maxRangeSize);
    const deletionsDuplications = dataContainer.getDeletionsDuplications(selTrack, selChromosome, start, end);
    return {
        rows: dataContainer.cnvRows,
        startPosition: start,
        endPosition: end,
        chromosomes: chromosomes,
        selectedChromosome: selChromosome,
        tracks: cnvTracks,
        selectedTrack: selTrack,
        deletionsDuplications
    };
}

function mapDispatchToProps(dispatch): MainPageEventProps {
    return {
        onChangeChromosome(chromosome: string) {
            dispatch({
                type: 'CHROMOSOME_SELECTED',
                chromosome
            })
        },
        onChangeTrack(track: string) {
            dispatch({
                type: 'TRACK_SELECTED',
                track
            })
        }
    };
}

export const MainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageUI);