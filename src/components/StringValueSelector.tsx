import * as _ from "lodash";
import * as React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';


interface StringValueSelectorProps {
    selectedValue: string;
    values: string[];
    onChange: (chromosome: string) => void;
}

export class StringValueSelector extends React.Component<StringValueSelectorProps, {}> {
    render() {
        const {selectedValue, values, onChange} = this.props;
        return <Select value={selectedValue}
                       options={_.map(values, ch => ({value: ch, label: ch}))}
                       clearable={false}
                       searchable={true}
                       onChange={(v: any) => onChange(v.value)}/>
    }
}