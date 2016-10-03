import React, { Component } from 'react';

class OverviewPlaque extends Component {
  //TODO: defaultPropTypes

  static defaultProps = {
      label: '',
      value: 0
  }

  render(){
  	return(<div className="overview-plaque">
	          <div className="plaque-title">
              {this.props.label}
            </div>
            <div className="plaque-value">
              {this.props.value.toFixed(3)}
            </div>
	        </div>)
  }
}

export default OverviewPlaque;
