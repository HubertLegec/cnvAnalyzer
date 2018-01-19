import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {Col, Grid, Row} from "react-bootstrap";
import {Table} from "../components/Table";
import {CnvRow, StructureRow} from "../reducers/cnvRows";
import {BarPlot} from "../components/BarPlot";
import {FloatingBarPlot} from "../components/FloatingBarPlot";
import {dataContainer} from "./App";
import Select from "react-select";
import {ChromosomeSelector} from "../components/ChromosomeSelector";

interface MainPageDataProps {
    rows: CnvRow[];
    structureRows: StructureRow[];
    startPosition: number;
    endPosition: number;
    selectedChromosome: string;
    chromosomes: string[];
}

interface MainPageEventProps {
    onChangeChromosome: (chromosome: string) => void
}

type MainPageProps = MainPageDataProps & MainPageEventProps;

interface MainPageState {}

export class MainPageUI extends React.Component<MainPageProps, MainPageState> {
    render() {
        const {rows, startPosition, endPosition, selectedChromosome, chromosomes, onChangeChromosome} = this.props;
        const filteredCnvRows = this.getFilteredCnvRows();
        const filteredStructRows = this.getFilteredStructureRows();
        return <Grid style={{paddingBottom: 30}}>
            {/*<Row>
                <FloatingBarPlot data={filteredCnvRows}/>
            </Row>*/}
            <Row>
                <BarPlot cnvRows={filteredCnvRows}
                         structureRows={filteredStructRows}
                         startPosition={startPosition}
                         endPosition={endPosition}/>
            </Row>
            <Row>
                <Col xs={3} md={3}>
                    <ChromosomeSelector selectedChromosome={selectedChromosome}
                                        chromosomes={chromosomes}
                                        onChange={onChangeChromosome}/>
                </Col>
                <Col xs={9} md={9}>

                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
                <Table rows={rows}/>
            </Row>
        </Grid>
    }

    private getFilteredCnvRows(): CnvRow[] {
        const {selectedChromosome, startPosition, endPosition, rows} = this.props;
        return _.chain(rows)
            .filter(r => r.chromosome === selectedChromosome)
            .filter(r => r.start <= endPosition && r.end >= startPosition)
            .value();
    }

    private getFilteredStructureRows(): StructureRow[] {
        const {selectedChromosome, structureRows} = this.props;
        return _.filter(structureRows, r => r.chromosome === selectedChromosome);
    }
}

function mapStateToProps(state: RootState): MainPageDataProps {
    const {startPosition, endPosition, selectedChromosome} = state.cnvRows;
    const chromosomes = _.chain(dataContainer.structureRows)
        .map(r => r.chromosome)
        .uniq()
        .sort()
        .value();
    const selChromosome = _.defaultTo(selectedChromosome, _.head(chromosomes));
    return {
        rows: dataContainer.cnvRows,
        structureRows: dataContainer.structureRows,
        startPosition,
        endPosition,
        chromosomes: chromosomes,
        selectedChromosome: selChromosome
    };
}

function mapDispatchToProps(dispatch): MainPageEventProps {
    return {
        onChangeChromosome(chromosome: string) {
            dispatch({
                type: 'CHROMOSOME_SELECTED',
                chromosome
            })
        }
    };
}

export const MainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageUI);