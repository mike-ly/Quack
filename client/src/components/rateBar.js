import React from 'react';

class RateBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
  	const numbers = ["one", "two", "three", "four", "five"];
    const score = this.props.score;
    let leftover = Math.round((score % 1) * 100);
    let scoreByFive = Math.round(score * 100) / 100;
    const truncScore = Math.trunc(score);
    const unit1 = "displayScoreBarUnitFill" + (score > 0 ? " " + numbers[truncScore] : "");
    const unit2 = "displayScoreBarUnitFill" + (score > 1 ? " " + numbers[truncScore] : "");
    const unit3 = "displayScoreBarUnitFill" + (score > 2 ? " " + numbers[truncScore] : "");
    const unit4 = "displayScoreBarUnitFill" + (score > 3 ? " " + numbers[truncScore] : "");
    const unit5 = "displayScoreBarUnitFill" + (score > 4 ? " " + numbers[truncScore] : "");
    const unit1style = { width: (truncScore === 0 ? (leftover + "%") : "100%")};
    const unit2style = { width: (truncScore === 1 ? (leftover + "%") : "100%")};
    const unit3style = { width: (truncScore === 2 ? (leftover + "%") : "100%")};
    const unit4style = { width: (truncScore === 3 ? (leftover + "%") : "100%")};
    const unit5style = { width: (truncScore === 4 ? (leftover + "%") : "100%")};
    return(
      <DisplayScoreBar
        unit1={unit1}
        unit2={unit2}
        unit3={unit3}
        unit4={unit4}
        unit5={unit5}
        unit1style={unit1style}
        unit2style={unit2style}
        unit3style={unit3style}
        unit4style={unit4style}
        unit5style={unit5style}
        scoreByFive={scoreByFive}
      />
    );
  }
}

function DisplayScoreBar(props) {
  return(
    <div className="displayScoreBar">
      <div className="displayScoreBarUnit"><div className={props.unit1} style={props.unit1style}></div></div>
      <div className="displayScoreBarDivider"></div>
      <div className="displayScoreBarUnit"><div className={props.unit2} style={props.unit2style}></div></div>
      <div className="displayScoreBarDivider"></div>
      <div className="displayScoreBarUnit"><div className={props.unit3} style={props.unit3style}></div></div>
      <div className="displayScoreBarDivider"></div>
      <div className="displayScoreBarUnit"><div className={props.unit4} style={props.unit4style}></div></div>
      <div className="displayScoreBarDivider"></div>
      <div className="displayScoreBarUnit"><div className={props.unit5} style={props.unit5style}></div></div>
      {/*<p className="standardText homeOverviewScoreValue">&nbsp;&nbsp;&nbsp;<span className="homeOverviewScoreDenominator">=</span> {props.scoreByFive}<span className="homeOverviewScoreDenominator"> /5</span> <span className="homeOverviewScoreReviewCount"></span></p>*/}
    </div>
  );
}

export default RateBar;