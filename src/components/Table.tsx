import * as React from "react";
import {CnvRow} from "../reducers/cnvRows";
import ReactTable, {Column} from "react-table";
import "react-table/react-table.css";

interface TableProps {
    rows: CnvRow[];
}

interface TableState {}

export class Table extends React.Component<TableProps, TableState> {
    render() {
        const {rows} = this.props;
        return <ReactTable
            data={rows}
            columns={this.getTableColumns()}
            defaultPageSize={50}
            className="-striped -highlight"
        />;
    }

    private getTableColumns(): Column[] {
        return [{
            Header: "Id",
            accessor: "id"
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