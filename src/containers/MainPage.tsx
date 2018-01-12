import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {Grid, Row} from "react-bootstrap";
import {Table} from "../components/Table";
import {CnvRow} from "../reducers/cnvRows";
import {BarPlot} from "../components/BarPlot";
import {FloatingBarPlot} from "../components/FloatingBarPlot";
import {dataContainer} from "./App";

interface MainPageDataProps {
    rows: CnvRow[]
}

interface MainPageEventProps {}

type MainPageProps = MainPageDataProps & MainPageEventProps;

interface MainPageState {}

export class MainPageUI extends React.Component<MainPageProps, MainPageState> {
    render() {
        const {rows} = this.props;
        return <Grid style={{paddingBottom: 30}}>
            <Row>
                <FloatingBarPlot data={rows}/>
            </Row>
            <Row>
                <BarPlot cnvRows={rows}/>
            </Row>
            <Row>
                <Table rows={rows}/>
            </Row>
        </Grid>
    }
}

function mapStateToProps(state: RootState): MainPageDataProps {
    const {structureRowsLoaded, loadedCnvRows} = state.cnvRows;
    return {
        rows: dataContainer.cnvRows
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