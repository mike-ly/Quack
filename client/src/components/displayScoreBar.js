import React from 'react';

class displayScoreBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
  	return (
  		<div className="displayScoreBar">
        <div className="displayScoreBarUnit"><div className="displayScoreBarUnitFill"></div></div>
        <div className="displayScoreBarDivider"></div>
        <div className="displayScoreBarUnit"></div>
        <div className="displayScoreBarDivider"></div>
        <div className="displayScoreBarUnit"></div>
        <div className="displayScoreBarDivider"></div>
        <div className="displayScoreBarUnit"></div>
        <div className="displayScoreBarDivider"></div>
        <div className="displayScoreBarUnit"></div>
      </div>
  	);
  }

  renderScoreBarUnit(score) {
    truncScore = Math.trunc(Math.random() * 5);
  }

}

export default displayScoreBar;