import * as React from "react";
import {connect} from "react-redux";
import {createSliderWithTooltip, Range} from "rc-slider";
import 'rc-slider/assets/index.css';
import {RootState} from "../reducers";
import {dataContainer} from "../containers/App";
import * as _ from "lodash";

interface RangeSelectorDataProps {
    minValue: number;
    maxValue: number;
    value: { min: number, max: number };
    maxRangeSize?: number;
}

interface RangeSelectorEventProps {
    onChange: (position: { min: number, max: number }) => void;
}

interface RangeSelectorState {
    min: number;
    max: number;
}

type RangeSelectorProps = RangeSelectorDataProps & RangeSelectorEventProps;

class RangeSelectorUI extends React.Component<RangeSelectorProps, RangeSelectorState> {
    constructor(props: RangeSelectorProps) {
        super(props);
        this.state = {
            min: props.value.min,
            max: props.value.max
        }
    }

    render() {
        const {minValue, maxValue} = this.props;
        const RangeTooltip = createSliderWithTooltip(Range);
        console.log('range', minValue, maxValue, _.cloneDeep(this.state));
        return <RangeTooltip min={minValue}
                             max={maxValue}
                             count={1}
                             allowCross={false}
                             pushable={100}
                             value={[this.state.min, this.state.max]}
                             onChange={(v: any) => this.onChange(v)} onAfterChange={(v: any) => this.onAfterChange(v)}/>

    }

    private onChange(newVal: number[]) {
        this.setState({
            min: newVal[0],
            max: newVal[1]
        })
    }

    private onAfterChange(newValue: number[]) {
        const {onChange, value, maxRangeSize = 100000} = this.props;
        if (newValue[1] - newValue[0] <= maxRangeSize) {
            onChange({min: newValue[0], max: newValue[1]});
        } else if (newValue[0] !== value.min) {
            const max = newValue[0] + maxRangeSize;
            onChange({min: newValue[0], max});
        } else {
            const min = newValue[1] - maxRangeSize;
            onChange({min, max: newValue[1]});
        }
    }
}

function mapStateToProps(state: RootState): RangeSelectorDataProps {
    const {cnvTracks} = state.cnvRows;
    const {startPosition, endPosition, selectedChromosome, selectedTrack} = state.selection;
    const chromosomes = dataContainer.chromosomes;
    const selChromosome = _.defaultTo(selectedChromosome, _.head(chromosomes));
    const selTrack = _.defaultTo(selectedTrack, _.head(cnvTracks));
    const range = dataContainer.getCnvsRange(selTrack, selChromosome);
    const maxRangeSize = 100000;
    return {
        minValue: range.min,
        maxValue: range.max,
        value: {min: startPosition || range.min, max: endPosition || range.min + maxRangeSize}
    };
}

function mapDispatchToProps(dispatch): RangeSelectorEventProps {
    return {
        onChange(position: { min: number, max: number }) {
            dispatch({
                type: 'POSITIONS_CHANGED',
                position
            })
        }
    };
}

export const RangeSelector = connect(
    mapStateToProps,
    mapDispatchToProps
)(RangeSelectorUI);