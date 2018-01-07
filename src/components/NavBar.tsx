import * as React from "react";
import {PageHeader} from "react-bootstrap";

interface NavBarProps {}

interface NavBarState {}

export class NavBar extends React.Component<NavBarProps, NavBarState> {
    render() {
        return <PageHeader>
            <span style={{marginLeft: "20px"}}>CNV Analyzer<small>MBI project</small></span>
        </PageHeader>;
    }
}