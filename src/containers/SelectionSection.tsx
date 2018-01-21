import * as _ from "lodash";
import * as React from "react";
import {RootState} from "../reducers";
import {connect} from "react-redux";
import {RangeSelector} from "../components/RangeSelector";
import {Col, Row} from "react-bootstrap";
import {DataTrackSelector} from "../components/DataTrackSelector";
import {ChromosomeSelector} from "../components/ChromosomeSelector";
import {dataContainer} from "./App";

interface SelectionSectionDataProps {
    selectedChromosome: string;
    chromosomes: string[];
    tracks: string[];
    selectedTrack: string;
    minValue: number;
    maxValue: number;
    value: { min: number, max: number };
    maxRangeSize?: number;
}

interface SelectionSectionEventProps {
    onChangeChromosome: (chromosome: string) => void;
    onChangeTrack: (track: string) => void;
    onChangeRange: (position: { min: number, max: number }) => void;
}

type SelectionSectionProps = SelectionSectionDataProps & SelectionSectionEventProps;

class SelectionSectionUI extends React.Component<SelectionSectionProps, {}> {
    render() {
        const {
            selectedChromosome, selectedTrack, chromosomes, tracks, minValue, maxValue, value, maxRangeSize,
            onChangeChromosome, onChangeTrack, onChangeRange
        } = this.props;
        return [
            <Row key={0} style={{marginBottom: 30}}>
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
            </Row>,
            <RangeSelector minValue={minValue} maxValue={maxValue} value={value} maxRangeSize={maxRangeSize} onChange={onChangeRange}/>
        ]
    }
}

function mapStateToProps(state: RootState): SelectionSectionDataProps {
    const {cnvTracks} = state.cnvRows;
    const {selectedChromosome, selectedTrack, startPosition, endPosition} = state.selection;
    const chromosomes = dataContainer.chromosomes;
    const selChromosome = _.defaultTo(selectedChromosome, _.head(chromosomes));
    const selTrack = _.defaultTo(selectedTrack, _.head(cnvTracks));
    const range = dataContainer.getCnvsRange(selTrack, selChromosome);
    const maxRangeSize = 50000;
    return {
        chromosomes: chromosomes,
        selectedChromosome: selChromosome,
        tracks: cnvTracks,
        selectedTrack: selTrack,
        minValue: range.min,
        maxValue: range.max,
        value: {min: startPosition || range.min, max: endPosition || range.min + maxRangeSize},
        maxRangeSize
    };
}

function mapDispatchToProps(dispatch): SelectionSectionEventProps {
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
        },
        onChangeRange(position: { min: number, max: number }) {
            dispatch({
                type: 'POSITIONS_CHANGED',
                position
            })
        }
    };
}

export const SelectionSection = connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectionSectionUI);