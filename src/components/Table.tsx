import * as React from "react";
import ReactTable, {Column} from "react-table";
import "react-table/react-table.css";
import {CnvRow} from "../utils/CnvFileReader";

interface TableProps {
    rows: CnvRow[];
}

interface TableState {}

export class Table extends React.Component<TableProps, TableState> {
    render() {
        const {rows} = this.props;
        return <ReactTable
            data={rows}
            filterable={true}
            columns={this.getTableColumns()}
            defaultPageSize={10}
            className="-striped -highlight"
        />;
    }

    private getTableColumns(): Column[] {
        return [{
            Header: "Name",
            accessor: "name"
        }, {
            Header: "Chromosome",
            accessor: "chromosome"
        }, {
            Header: "Start position",
            accessor: "start"
        }, {
            Header: "End position",
            accessor: "end"
        }, {
            Header: "Type",
            accessor: "type"
        }, {
            Header: "Source",
            accessor: "source"
        }]
    }
}