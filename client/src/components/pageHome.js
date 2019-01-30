import React from 'react';
import WriteReview from './writeReview.js';
import Waypoint from 'react-waypoint';
import RateBar from './rateBar.js';
import ReviewFeed from './reviewFeed.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wedenesday", "Thursday", "Friday", "Saturday"];
    this.currentDate = new Date();
    this.state = {
      day: days[this.currentDate.getDay()],
      month: months[this.currentDate.getMonth()],
      dateNumber: this.currentDate.getDate(),
      activeMeal: this.decideActiveMeal(this.currentDate, this.props.mealTimes),
    };

    console.log(this.decideActiveMeal(this.currentDate, this.props.mealTimes));
  }

  shouldComponentUpdate(nextProps) {
    return false;
  }

  handleWaypointEnter() {
    this.props.navBarQuackDeactivate();
  }

  handleWaypointLeave() {
    this.props.navBarQuackActivate();
  }

  decideActiveMeal(date, mealTimes) {
    if (date < mealTimes.breakfastStart) {
      return "preBreakfast";
    } else if (date < mealTimes.breakfastEnd) {
      return "breakfast";
    } else if (date < mealTimes.lunchStart) {
      return "preLunch";
    } else if (date < mealTimes.lunchEnd) {
      return "lunch";
    } else if (date < mealTimes.dinnerStart) {
      return "preDinner";
    } else if (date < mealTimes.dinnerEnd) {
      return "dinner";
    } else {
      return "postDinner";
    }
  }

  dateToTimeString(date) {
    const ampm = date.getHours() / 12 < 1 ? "AM" : "PM";
    let hours = date.getHours() % 12;
    let minutes = date.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return "" + hours + ":" + minutes + " " + ampm;
  }

  render() {
    console.log("RENDER: HomePage");
    return(
      <div className="homeGeneralContainer">
        {/*
        <div className="standardContentContainer transparent">
          <p className="standardText standardTextPaddingHorizontal">
            <span className="homeOverviewToday">Emory University</span>
          </p>
        </div>
        */}

        <div className="coloredHeaderContentContainer z-depth-3">
          <div className="standardHeader standardText">{this.state.day}, {this.state.month} {this.state.dateNumber}</div>

          {/*
          <div className="standardContentFlexRow">
            <p className="standardText">
              <span className="homeOverviewToday"><span className="homeOverviewDate">&bull;</span></span>
            </p>
            <p className="standardText standardTextPaddingHorizontal">
              <span className="homeOverviewToday"><span className="homeOverviewDate">{this.state.day}, {this.state.month} {this.state.dateNumber}</span></span>
            </p>
          </div>
          <div className="standardDivider"></div>
          */}
          <div className="homeContentContainerStatus">
            <div className="standardContentPadding standardContentFlexRow homeOverviewScoreContainer">
              <p className="standardText homeOverviewScoreTitle">Breakfast</p>
              <div className="standardContentFlexRow">
                <p className="standardText homeOverviewScoreTime">
                  <span className={this.state.activeMeal === "preBreakfast" || this.state.activeMeal === "breakfast" ? "pulseBlue" : ""}>
                    {this.dateToTimeString(this.props.mealTimes.breakfastStart)}
                  </span> 
                  <span className={this.state.activeMeal === "breakfast" ? "pulseBlue" : ""}> &mdash; </span> 
                  <span className={this.state.activeMeal === "breakfast" ? "pulseBlue" : ""}>
                    {this.dateToTimeString(this.props.mealTimes.breakfastEnd)}
                  </span>
                </p>
                <RateBar
                  score={Math.random() * 5}
                />
              </div>
            </div>
            <div className="standardContentPadding"><div className="standardDivider"></div></div>
            <div className="standardContentPadding standardContentFlexRow homeOverviewScoreContainer">
              <p className="standardText homeOverviewScoreTitle">Lunch</p>
              <div className="standardContentFlexRow">
                <p className="standardText homeOverviewScoreTime">
                  <span className={this.state.activeMeal === "preLunch" || this.state.activeMeal === "lunch" ? "pulseBlue" : ""}>
                    {this.dateToTimeString(this.props.mealTimes.lunchStart)}
                  </span> 
                  <span className={this.state.activeMeal === "lunch" ? "pulseBlue" : ""}> &mdash; </span> 
                  <span className={this.state.activeMeal === "lunch" ? "pulseBlue" : ""}>
                    {this.dateToTimeString(this.props.mealTimes.lunchEnd)}
                  </span>
                </p>
                <RateBar
                  score={Math.random() * 5}
                />
              </div>
            </div>
            <div className="standardContentPadding"><div className="standardDivider"></div></div>
            <div className="standardContentPadding standardContentFlexRow homeOverviewScoreContainer">
              <p className="standardText homeOverviewScoreTitle">Dinner</p>
              <div className="standardContentFlexRow">
                <p className="standardText homeOverviewScoreTime">
                  <span className={this.state.activeMeal === "preDinner" || this.state.activeMeal === "dinner" ? "pulseBlue" : ""}>
                    {this.dateToTimeString(this.props.mealTimes.dinnerStart)}
                  </span> 
                  <span className={this.state.activeMeal === "dinner" ? "pulseBlue" : ""}> &mdash; </span> 
                  <span className={this.state.activeMeal === "dinner" ? "pulseBlue" : ""}>
                    {this.dateToTimeString(this.props.mealTimes.dinnerEnd)}
                  </span>
                </p>
                <RateBar
                  score={Math.random() * 5}
                />
              </div>
            </div>
          </div>
          <div className="standardClear"></div>
        </div>
        <Waypoint
          onEnter={() => this.handleWaypointEnter(this)}
          onLeave={() => this.handleWaypointLeave(this)}
        >
          <div>
            <WriteReview/>
          </div>
        </Waypoint>
        <div className="standardContentContainer bottomBorder">
          {/*
          <p className="standardText standardTextPaddingHorizontal standardTextPaddingVertical">
            <b>Goofy Goose</b>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;24m</span>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;Emory University</span>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;DUC-ling</span>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;Breakfast</span><br/>
            The DUC is not that good today, menu sucks. Better to go to COX.
          </p>
          <div className="standardDivider"></div>
          <p className="standardText standardTextPaddingHorizontal standardTextPaddingVertical">
            <b>Daffy Duck</b>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;11m</span>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;Emory University</span>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;DUC-ling</span>
            &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;Breakfast</span><br/>
            Wouldn't recommend, workers are grumpy today >:(
          </p>
          */}
          <ReviewFeed
            day={this.state.day}
            month={this.state.month}
            dateNumber={this.state.dateNumber}
            activeMeal={this.state.activeMeal}
          />
        </div>
      </div>
    );
  };
}

export default HomePage;