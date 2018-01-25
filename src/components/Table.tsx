import * as _ from "lodash";
import * as React from "react";
import ReactTable, {Column} from "react-table";
import "react-table/react-table.css";
import {CnvRow} from "../utils/CnvFileReader";

interface TableProps {
    rows: CnvRow[];
    onRowClicked: (row: CnvRow) => void;
}

interface TableState {}

export class Table extends React.Component<TableProps, TableState> {
    render() {
        const {rows, onRowClicked} = this.props;
        return <ReactTable
            data={rows}
            filterable={true}
            defaultFilterMethod={(filter, row) => {
                const filterVal = _.toLower(_.toString(filter.value));
                const val = _.toLower(_.toString(row[filter.id]));
                return _.includes(val, filterVal);
            }}
            columns={Table.getTableColumns()}
            defaultPageSize={20}
            className="-striped -highlight"
            getTdProps={(state, rowInfo, column, instance) => ({
                onClick: (e, handleOriginal) => {
                    onRowClicked(rowInfo.row);
                    if (handleOriginal) {
                        handleOriginal();
                    }
                }
            })}
        />;
    }

    private static getTableColumns(): Column[] {
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