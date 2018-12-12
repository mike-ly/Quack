import React from 'react';
import MaterialIcon from 'material-icons-react';
import FilterBarItem from './filterBarItem.js';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasActivated: false,
    };
  }

  render() {
    return(
      <div className="filterBarGeneralContainer">
        <div className="contentContainer filterBarContentContainer">
          <div className="filterBarSectionContainer">
            <div className="filterBarActivationContainer button">
              <div className="standardText filterBarActivationButton">
                <MaterialIcon icon="location_on" color="#757575"/>
              </div>
              <div className="standardText filterBarName">
                Emory University
              </div>
            </div>
          </div>
          <div className="filterBarActivationDivider"></div>
          <FilterBarItem 
            key={0}
            icon="store"
            type="diningHall"
            options={["All dining halls", "DUC-ling", "Rollin's Café", "SAAC Café", "Ray's at WREC"]} 
            activeOption={0}
            parentActivation={() => this.handleOptionActivation()}
          />
          <div className="filterBarActivationDivider"></div>
          <FilterBarItem 
            key={1}
            icon="date_range"
            type="timePeriod"
            options={["Today", "This week", "This month", "This year"]}
            activeOption={0}
            parentActivation={() => this.handleOptionActivation()}
          />
          <div className="filterBarActivationDivider"></div>
          <FilterBarItem 
            key={2}
            icon="fastfood"
            type="meal"
            options={["All meals", "Breakfast", "Lunch", "Dinner"]} 
            activeOption={0}
            parentActivation={() => this.handleOptionActivation()}
          />
          <div className="filterBarActivationDivider"></div>
          <FilterBarItem 
            key={3}
            icon="filter_list"
            type="sortMethod"
            options={["New", "Hot", "Top", "Low"]}
            activeOption={0}
            parentActivation={() => this.handleOptionActivation()}
          />
        </div>
      </div>
    );
  };

   handleOptionActivation() {
    // this.setState({
    //   hasActivated: !this.state.hasActivated
    // });
   }
}

export default FilterBar;