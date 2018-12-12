import React from 'react';
import RateBar from './rateBar.js'
// import MaterialIcon from 'material-icons-react';

class DailyStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  getMonthString(date) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return months[date.getMonth()];
  }

  render() {
    console.log("RENDER: DailyStats");
  	return (
  		<div>
        {this.renderDailyStats()}
      </div>
  	);
  }

  renderDailyStats() {
    let dailyStats = [];
    let date = new Date();
    for (let i = 0; i < 5; i++) {
      date.setDate(date.getDate() - 1);
      dailyStats.push(this.renderDailyStat(i, this.getMonthString(date), date.getDate()));
    }
    return dailyStats;
  }

  renderDailyStat(index, month, day) {
    return(
      <DailyStat
        key={index}
        isOdd={index % 2 === 0}
        month={month}
        day={day}
      />
    );
  }
}

function DailyStat(props) {
  // const statContainerClass = props.isOdd ? "statContainer odd" : "statContainer even";
  return (
    <div>
      {/*<a className={titleClass} onClick={props.onMenuClick}>{props.meal}<br/></a>*/}
      <div className="statContainer button">
        <div className="statGrid">
          <div className="statDateContainer">
            <div className="statDate z-depth-">
              <p className="statDateMonth">{props.month}</p>
              <p className="statDateDay">{props.day}</p>
            </div>
          </div>
          <div className="statInfoContainer">
            <RateBar
              score={Math.random() * 5}
            />
          </div>
        </div>
      </div>
      <div className="standardDivider noMargin"></div>
    </div>
  );
}

export default DailyStats;