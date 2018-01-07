import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {Grid, Row} from "react-bootstrap";
import {Table} from "../components/Table";
import {CnvRow} from "../reducers/cnvRows";

interface MainPageDataProps {
    rows: CnvRow[]
}

interface MainPageEventProps {}

type MainPageProps = MainPageDataProps & MainPageEventProps;

interface MainPageState {}

export class MainPageUI extends React.Component<MainPageProps, MainPageState> {
    render() {
        const {rows} = this.props;
        return <Grid>
            <Row className="show-grid">
                aaaa
            </Row>
            <Row>
                <Table rows={rows}/>
            </Row>
        </Grid>
    }
}

function mapStateToProps(state: RootState): MainPageDataProps {
    const {caseRows, controlRows} = state.cnvRows;
    return {
        rows: [...caseRows, ...controlRows]
    };
}

function mapDispatchToProps(dispatch): MainPageEventProps {
    return {

    };
}

export const MainPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPageUI);