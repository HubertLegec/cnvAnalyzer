import * as _ from "lodash";
import * as React from "react";
import {Button, ButtonToolbar, Col, Grid, Row} from "react-bootstrap";
import {RootState} from "../reducers";
import {connect} from "react-redux";

import {push} from "react-router-redux";
import DropzoneComponent from "react-dropzone-component";
import "react-dropzone-component/styles/filepicker.css";
import "./dropzone.css"
import {StructureFileReader} from "../utils/StructureFileReader";
import {CnvFileReader} from "../utils/CnvFileReader";
import {dataContainer} from "./App";

interface StartPageDataProps {

}

interface StartPageEventProps {
    onNextClick: () => void;
    onStructureRowsLoaded: () => void;
    onCnvRowsLoaded: (type: string) => void;
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
        const {onStructureRowsLoaded} = this.props;
        const reader = new StructureFileReader(file);
        reader.getStructureRows()
            .then(rows => {
                console.log('structure loaded: ', _.size(rows));
                dataContainer.structureRows = rows;
                onStructureRowsLoaded();
            }
            );
    }

    private onDropCnv(file: File) {
        const {onCnvRowsLoaded} = this.props;
        const reader = new CnvFileReader(file);
        reader.getCnvRows()
            .then(rows => {
                console.log('cnv loaded');
                dataContainer.cnvRows = [...dataContainer.cnvRows, ...rows];
                onCnvRowsLoaded(reader.getSourceName());
            })
    }

}

function mapStateToProps(state: RootState): StartPageDataProps {
    return {};
}

function mapDispatchToProps(dispatch): StartPageEventProps {
    return {
        onNextClick() {
            dispatch(push('/main'))
        },
        onStructureRowsLoaded() {
            dispatch({
                type: "STRUCTURE_ROWS_LOADED"
            })
        },
        onCnvRowsLoaded(type: string) {
            dispatch({
                type: "CNV_ROWS_LOADED",
                loadedType: type
            })
        }
    };
}

export const StartPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPageUI);