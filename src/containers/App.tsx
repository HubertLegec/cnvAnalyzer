import * as React from "react";
import {DataContainer} from "../reducers/cnvRows";


// Data from files needs to be keep in global variable, because Redux can't handle such amount of data
export const dataContainer: DataContainer = {
    structureRows: [],
    cnvRows: []
};

(window as any).dataContainer = dataContainer;

export class App extends React.Component<{}, {}> {
    render() {
        return <div>
            {this.props.children}
        </div>;
    }
}