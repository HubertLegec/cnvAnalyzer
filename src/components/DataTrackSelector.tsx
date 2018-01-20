import * as _ from "lodash";
import * as React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';

interface DataTrackSelectorProps {
    tracks: string[];
    selectedTrack: string;
    onChange: (newTrack: string) => void;
}

export class DataTrackSelector extends React.Component<DataTrackSelectorProps, {}> {
    render() {
        const {tracks, selectedTrack} = this.props;
        return <Select options={_.map(tracks, t => ({value: t, label: t}))}
                       value={selectedTrack}
                       onChange={v => this.onChange(v)}/>
    }

    private onChange(newValue: any) {
        const {onChange} = this.props;
        onChange(newValue.value);
    }
}