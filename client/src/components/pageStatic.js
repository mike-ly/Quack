import React from 'react';
import DailyMenus from './dailyMenus';
import DailyStats from './dailyStats';
import Footer from './footer';

class StaticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mealStatus: this.generateCurrentMealStatus(new Date())
    };
  }

  componentDidMount() {
  }

  generateGreeting(activeMeal) {
    if (activeMeal === "preBreakfast") {
      return "Early bird gets the worm!";
    } else if (activeMeal === "breakfast") {
      return "Good morning!";
    } else if (activeMeal === "preLunch") {
      return "Is it lunch yet?";
    } else if (activeMeal === "lunch") {
      return "Lunchtime!";
    } else if (activeMeal === "preDinner") {
      return "Anyone hungry?";
    } else if (activeMeal === "dinner") {
      return "Dinner is served!";
    } else if (activeMeal === "postDinner") {
      return "That's it for today!";
    }
  }

  generateCurrentMealStatus(date) {
    const activeMeal = this.decideActiveMeal(date, this.props.mealTimes);
    let meal;
    let action;
    let targetDate;
    let andString = "";
    let inString = " in";
    let agoString = ""
    let hourString;
    let minuteString;
    if (activeMeal === "preBreakfast") {
      meal = "Breakfast";
      action = "starts";
      targetDate = this.props.mealTimes.breakfastStart;
    } else if (activeMeal === "breakfast") {
      meal = "Breakfast";
      action = "ends";
      targetDate = this.props.mealTimes.breakfastEnd;
    } else if (activeMeal === "preLunch") {
      meal = "Lunch";
      action = "starts";
      targetDate = this.props.mealTimes.lunchStart;
    } else if (activeMeal === "lunch") {
      meal = "Lunch";
      action = "ends";
      targetDate = this.props.mealTimes.lunchEnd;
    } else if (activeMeal === "preDinner") {
      meal = "Dinner";
      action = "starts";
      targetDate = this.props.mealTimes.dinnerStart;
    } else if (activeMeal === "dinner") {
      meal = "Dinner";
      action = "ends";
      targetDate = this.props.mealTimes.dinnerEnd;
    } else if (activeMeal === "postDinner") {
      meal = "Dinner";
      action = "ended";
      targetDate = date;
      inString = "";
      agoString = " ago";
      date = this.props.mealTimes.dinnerEnd;
    }
    let timeDifference = targetDate.getTime() - date.getTime();
    let minuteDifference = parseInt(timeDifference / 1000 / 60, 10);
    let hours = parseInt(minuteDifference / 60, 10);
    let minutes = minuteDifference % 60;
    if (hours > 0 && minutes > 0) {
      andString = " and";
    }
    if (hours === 0) {
      hourString = "";
    } else if (hours > 1) {
      hourString = " " + hours + " hours";
    } else if (hours > 0) {
      hourString = " " + hours + " hour";
    }
    if (minutes === 0) {
      minuteString = "";
    } else if (minutes > 1) {
      minuteString = " " + minutes + " minutes";
    } else if (minutes > 0) {
      minuteString = " " + minutes + " minute";
    }
    return "" + meal + " " + action + inString + hourString + andString + minuteString + agoString + ".";
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

  handleMenuClick(meal) {

  }

  render() {
    return(
      <div className="staticGeneralContainer">
        <div className="greetingContainer z-depth-2">
          <p className="standardText greetingText greetingHeaderText">{this.generateGreeting(this.decideActiveMeal(new Date(), this.props.mealTimes))}</p>
          <p className="standardText greetingText statusText">{this.state.mealStatus}</p>
          <p className="standardText greetingText">Check out the <span>menu</span>, <span>ratings</span>, and <span>reviews</span> before you decide where to eat, and <span>Quack</span> about your meal after!</p>
        </div>
        <div className="standardContentContainer noPadding bottomBorder">
          {/*
          <div className="standardHeader standardText">Menu</div>
          */}
          {/*
          <div className="menuDatesContainer">
            <a className="standardText menuDateItemText active">Today</a>
            <a className="standardText menuDateItemText">Aug 5</a>
            <a className="standardText menuDateItemText">Aug 6</a>
            <a className="standardText menuDateItemText">Aug 7</a>
            <a className="standardText menuDateItemText">Aug 8</a>
          </div>
          */}
          <div className="flexDivider"></div>
          <DailyMenus
            onClick={(meal) => this.handleMenuClick()}
            eatery='DUCling'
          />
        </div>
        {/*
        <div className="coloredHeaderContentContainer">
          <div className="standardHeader standardText">Stats</div>
          <DailyStats
              onClick={(meal) => this.handleMenuClick()}
          />
        </div>
        */}
        <div className="standardContentContainer bottomBorder">
          <Footer/>
        </div>
      </div>
    );
  };
}

export default StaticPage;