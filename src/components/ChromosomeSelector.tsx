import * as _ from "lodash";
import * as React from "react";
import Select from "react-select";
import 'react-select/dist/react-select.css';


interface ChromosomeSelectorProps {
    selectedChromosome: string;
    chromosomes: string[];
    onChange: (chromosome: string) => void;
}

export class ChromosomeSelector extends React.Component<ChromosomeSelectorProps, {}> {
    render() {
        const {selectedChromosome, chromosomes, onChange} = this.props;
        return <Select value={selectedChromosome}
                       options={_.map(chromosomes, ch => ({value: ch, label: ch}))}
                       clearable={false}
                       searchable={true} onChange={(v: any) => onChange(v.value)}/>
    }
}