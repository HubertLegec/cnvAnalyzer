import * as _ from "lodash";
import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../reducers";
import {Grid, Row} from "react-bootstrap";

interface MainPageDataProps {}

interface MainPageEventProps {}

type MainPageProps = MainPageDataProps & MainPageEventProps;

interface MainPageState {}

export class MainPageUI extends React.Component<MainPageProps, MainPageState> {
    render() {
        return <Grid>
            <Row className="show-grid">
                aaaa
            </Row>
            <Row>

            </Row>
        </Grid>
    }
}

function mapStateToProps(state: RootState): MainPageDataProps {
    return {

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