import * as _ from "lodash";
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
            defaultFilterMethod={(filter, row) => {
                const filterVal = _.toLower(_.toString(filter.value));
                const val = _.toLower(_.toString(row[filter.id]));
                return _.includes(val, filterVal);
            }}
            columns={this.getTableColumns()}
            defaultPageSize={20}
            className="-striped -highlight"
        />;
    }

    private getTableColumns(): Column[] {
        return [{
            Header: "Name",
            accessor: "name"
        }, {
            Header: "Chromosome",
            accessor: "chromosome",
            filterable: false
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