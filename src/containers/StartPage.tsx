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
    structureLoaded: boolean;
    cnvLoaded: boolean;
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
        postUrl: 'no-url',
        maxFiles: 2,
        addRemoveLinks: true,
    };
    private djsConfig = { autoProcessQueue: false };
    private strEventHandlers = {
        addedfile: (file) => this.onDropStructure(file),
        init: (dropzone) => this.structureDropzone = dropzone
    };
    private cnvEventHandlers = {
        addedfile: (file) => this.onDropCnv(file),
        init: (dropzone) => this.cnvDropzone = dropzone
    };

    private structureDropzone;
    private cnvDropzone;

    render() {
        const {onNextClick, structureLoaded, cnvLoaded} = this.props;
        return <Grid>
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    Structure file
                </Col>
                <Col xs={6} md={6}>
                    CNV data files
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={6} md={6}>
                    <DropzoneComponent config={this.config}
                                       eventHandlers={this.strEventHandlers}
                                       djsConfig={this.djsConfig} />
                </Col>
                <Col xs={6} md={6}>
                    <DropzoneComponent config={this.config}
                                       eventHandlers={this.cnvEventHandlers}
                                       djsConfig={this.djsConfig} />
                </Col>
            </Row>
            <Row className="show-grid" style={{marginTop: 20}}>
                <ButtonToolbar>
                    <Button bsStyle="primary"
                            disabled={!(structureLoaded && cnvLoaded)}
                            onClick={onNextClick}>Next</Button>
                </ButtonToolbar>
            </Row>
        </Grid>
    }

    private onDropStructure(file: File) {
        const {onStructureRowsLoaded} = this.props;
        const reader = new StructureFileReader(file);
        reader.getStructureRows()
            .then(rows => {
                dataContainer.setStructureRows(rows);
                console.log('structure loaded: ', _.size(rows));
                onStructureRowsLoaded();
            });
    }

    private onDropCnv(file: File) {
        const {onCnvRowsLoaded} = this.props;
        const reader = new CnvFileReader(file);
        reader.getCnvRows()
            .then(rows => {
                dataContainer.addCnvRows(rows, reader.getSourceName());
                console.log('cnv loaded');
                onCnvRowsLoaded(reader.getSourceName());
            })
    }

}

function mapStateToProps(state: RootState): StartPageDataProps {
    const {cnvRows} = state;
    return {
        structureLoaded: cnvRows.structureRowsLoaded,
        cnvLoaded: !_.isEmpty(cnvRows.cnvTracks)
    };
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
                track: type
            })
        }
    };
}

export const StartPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPageUI);