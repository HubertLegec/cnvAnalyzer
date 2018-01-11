import * as React from "react";
import {Button, ButtonToolbar, Col, Grid, Row} from "react-bootstrap";
import {RootState} from "../reducers";
import {connect} from "react-redux";

import {push} from "react-router-redux";
import DropzoneComponent from "react-dropzone-component";
import "react-dropzone-component/styles/filepicker.css";
import "./dropzone.css"
import {StructureFileReader} from "../utils/StructureFileReader";

interface StartPageDataProps {

}

interface StartPageEventProps {
    onNextClick: () => void;
}

type StartPageProps = StartPageDataProps & StartPageEventProps;

interface StartPageState {}

class StartPageUI extends React.Component<StartPageProps, StartPageState> {
    private config = {
        iconFiletypes: ['.txt'],
        showFiletypeIcon: true,
        postUrl: 'no-url'
    };
    private djsConfig = { autoProcessQueue: false };
    private strEventHandlers = { addedfile: (file) => this.onDropStructure(file) };
    private cnvEventHandlers = { addedfile: (file) => this.onDropCnv(file)}

    render() {
        const {onNextClick} = this.props;
        return <Grid>
            <Row className="show-grid">
                <Col md={6} mdPush={6}>
                    Structure file
                </Col>
                <Col md={6} mdPull={6}>
                    CNV data files
                </Col>
            </Row>
            <Row className="show-grid">
                <Col md={6} mdPush={6}>
                    <DropzoneComponent config={this.config}
                                       eventHandlers={this.strEventHandlers}
                                       djsConfig={this.djsConfig} />
                </Col>
                <Col md={6} mdPull={6}>
                    <DropzoneComponent config={this.config}
                                       eventHandlers={this.cnvEventHandlers}
                                       djsConfig={this.djsConfig} />
                </Col>
            </Row>
            <Row className="show-grid" style={{marginTop: 20}}>
                <ButtonToolbar>
                    <Button bsStyle="primary" onClick={onNextClick}>Next</Button>
                </ButtonToolbar>
            </Row>
        </Grid>
    }

    private onDropStructure(file: File) {
        const reader = new StructureFileReader(file);
        reader.getStructureRows()
            .then(rows => console.log('rows', rows));
    }

    private onDropCnv(file) {

    }

}

function mapStateToProps(state: RootState): StartPageDataProps {
    return {};
}

function mapDispatchToProps(dispatch): StartPageEventProps {
    return {
        onNextClick() {
            dispatch(push('/main'))
        }
    };
}

export const StartPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPageUI);