import React from 'react';
import MaterialIcon from 'material-icons-react';
import FilterBarOptions from './filterBarOptions.js';

class FilterBarItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.state = {
      activeOption: this.props.activeOption,
      isActivated: false,
      activationEnabled: true,
      deactivationEnabled: false
    };
  }

  render() {
    console.log("RENDER: filterBarItem");
    return(
      <div className="filterBarSectionContainer">
        <div className="filterBarActivationContainer active button" onClick={() => this.handleActivationClick()}>
          <div className="standardText filterBarActivationButton">
            <MaterialIcon icon={this.props.icon} color="#3f51b5" />
          </div>
          <div className="standardText filterBarName">
            {this.props.options[this.state.activeOption]}
          </div>
        </div>
        <FilterBarOptions
          eventTypes="click"
          options={this.props.options}
          isActivated={this.state.isActivated}
          disableOnClickOutside={!this.state.isActivated}
          handleOptionClick={this.handleOptionClick}
          handleOutsideClick={() => this.handleOutsideClick()}
          activeOption={this.state.activeOption}
          deactivationEnabled={this.state.deactivationEnabled}
          enableDeactivation={() => this.enableDeactivation()}
        />
      </div>
    );
  };

  enableDeactivation() {
    this.setState({
      deactivationEnabled: true
    });
  }

  handleActivationClick() {
    if (this.state.activationEnabled) {
      this.setState({
        deactivationEnabled: false,
        activationEnabled: false
      });
      this.openDropdown();
    }
  }

  handleOutsideClick() {
    this.setState({
      activationEnabled: false
    });
    this.closeDropdown();
    this.setState({
      activationEnabled: true
    });
  }

  handleOptionClick(index) {
    this.closeDropdown();
    this.setState({
      activeOption: index,
      activationEnabled: true
    });
    this.props.parentActivation(this.props.type, this.props.options[index]);
  }

  openDropdown() {
    this.setState({
      isActivated: true
    });
  }

  closeDropdown() {
    this.setState({
      isActivated: false,
      activationEnabled: true
    });
  }
}

export default FilterBarItem;