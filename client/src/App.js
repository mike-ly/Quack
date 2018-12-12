import React, { Component } from 'react'; 
import NavBar from './components/navBar.js';
import HomePage from './components/pageHome.js';
import StaticPage from './components/pageStatic.js';
import FilterBar from './components/filterBar.js'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealTimes: this.retrieveMealTimes(),
      navBarQuackActive: false,
      filteredSchool: "Emory University",
      filteredDiningHall: "DUC-ling",
      filteredDay: "Today",
      filteredMeal: "Breakfast",
      filteredSort: "New"
    };
  }

  navBarQuackActivate() {
    this.setState({
      navBarQuackActive: true
    });
  }

  navBarQuackDeactivate() {
    this.setState({
      navBarQuackActive: false
    });
  }

  retrieveMealTimes() {
    const breakfastStart = new Date();
    const breakfastEnd = new Date();
    const lunchStart = new Date();
    const lunchEnd = new Date();
    const dinnerStart = new Date();
    const dinnerEnd = new Date();

    breakfastStart.setHours(7);
    breakfastStart.setMinutes(30);
    breakfastEnd.setHours(10);
    breakfastEnd.setMinutes(0);
    lunchStart.setHours(11);
    lunchStart.setMinutes(0);
    lunchEnd.setHours(14);
    lunchEnd.setMinutes(0);
    dinnerStart.setHours(17);
    dinnerStart.setMinutes(0);
    dinnerEnd.setHours(19);
    dinnerEnd.setMinutes(30);

    breakfastStart.setSeconds(0);
    breakfastEnd.setSeconds(0);
    lunchStart.setSeconds(0);
    lunchEnd.setSeconds(0);
    dinnerStart.setSeconds(0);
    dinnerEnd.setSeconds(0);
    return {
      breakfastStart: breakfastStart, 
      breakfastEnd: breakfastEnd,
      lunchStart: lunchStart,
      lunchEnd: lunchEnd,
      dinnerStart: dinnerStart,
      dinnerEnd: dinnerEnd
    };
  }

  render() {
    return(
    	<div className="appContainer">
	      <NavBar
          navBarQuackActive={this.state.navBarQuackActive}
        />
        <FilterBar/>
        <div className="contentContainer appContentContainer">
	       <HomePage
          navBarQuackActivate={() => this.navBarQuackActivate()}
          navBarQuackDeactivate={() => this.navBarQuackDeactivate()}
          mealTimes={this.state.mealTimes}
         />
         <StaticPage
          mealTimes={this.state.mealTimes}
         />
        </div>
      </div>
    );
  };
}

export default App;