import React, { Component } from 'react';
import './PointButton.scss'

class PointButton extends Component {
  render() {
    return (
    	<div className = {this.props.direction} onClick = {this.props.clicked}>
    		<p>{this.props.name}</p>
    	</div>
    	);
  }
}

export default PointButton;
