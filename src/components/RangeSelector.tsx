import * as React from "react";
import 'rc-slider/assets/index.css';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Row} from "react-bootstrap";

interface RangeSelectorProps {
    minValue: number;
    maxValue: number;
    value: { min: number, max: number };
    maxRangeSize: number;
    onChange: (position: { min: number, max: number }) => void;
}

interface RangeSelectorState {}

export class RangeSelector extends React.Component<RangeSelectorProps, RangeSelectorState> {
    private step = 10000;

    render() {
        const {value} = this.props;
        return <Row>
            <Col xs={2} md={2} style={{verticalAlign: 'center', textAlign: 'right', fontSize: 16, marginTop: 15}}>
                Move
            </Col>
            <Col xs={1} md={1} style={{marginTop: 10}}>
                <Button onClick={() => this.onLeftClick()}>
                    <Glyphicon glyph="glyphicon glyphicon-chevron-left"/>
                </Button>
            </Col>
            <Col xs={4} md={4}>
                <Form>
                <FormGroup>
                    <ControlLabel>Min position</ControlLabel>
                    <FormControl type="number" value={value.min} onChange={(e: any) => this.onMinChange(e.target.value)}/>
                </FormGroup>
                </Form>
            </Col>
            <Col xs={4} md={4}>
                <Form>
                    <FormGroup>
                        <ControlLabel>Max position</ControlLabel>
                        <FormControl type="number" value={value.max} onChange={(e: any) => this.onMaxChange(e.target.value)} />
                    </FormGroup>
                </Form>
            </Col>
            <Col xs={1} md={1} style={{marginTop: 10}}>
                <Button onClick={() => this.onRightClick()}>
                    <Glyphicon glyph="glyphicon glyphicon-chevron-right"/>
                </Button>
            </Col>
        </Row>
    }

    private onMinChange(val: number) {
        const {onChange, value, minValue, maxRangeSize} = this.props;
        if (val > value.max) {
            return;
        }
        const min = val > minValue ? val : minValue;
        const max = value.max - min < maxRangeSize ? value.max : min + maxRangeSize;
        onChange({min, max});
    }

    private onMaxChange(val: number) {
        const {onChange, value, maxValue, maxRangeSize} = this.props;
        if (val < value.min) {
            return;
        }
        const max = val < maxValue ? val : maxValue;
        const min = max - value.min < maxRangeSize ? value.min : max - maxRangeSize;
        onChange({min, max})
    }

    private onLeftClick() {
        const {onChange, value, minValue} = this.props;
        const step = minValue < value.min - this.step ? this.step : (minValue - (value.min - this.step));
        onChange({min: value.min - step, max: value.max - step});
    }

    private onRightClick() {
        const {onChange, value, maxValue} = this.props;
        const step = maxValue > value.max + this.step ? this.step : (value.max + this.step - maxValue);
        onChange({min: value.min + step, max: value.max + step});
    }
}