import React from 'react';
import onClickOutside from 'react-onclickoutside';

class FilterBarOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let options = [];
    let filterBarOptionsContainerClass = this.props.isActivated ? "filterBarOptionsContainer z-depth-2 active" : "filterBarOptionsContainer z-depth-2";
    for (let i = 0; i < this.props.options.length; i++) {
      options.push(this.renderOption(this.props.options[i], i, this.props.activeOption === i))
    }
    return (
      <div className={filterBarOptionsContainerClass}>
        {options}
      </div>
    );
  };

  handleClickOutside = (event) => {
    if (this.props.deactivationEnabled) {
      this.props.handleOutsideClick(this.props.activeOption);
    } else {
      this.props.enableDeactivation();
    }
  }

  renderOption(option, key, isActive) {
    let optionClass = isActive ? "filterBarOption button active" : "filterBarOption button";
    return(
      <div key={key} className={optionClass} onClick={() => this.props.handleOptionClick(key)}><p className="filterBarOptionText">{option}</p></div>
    );
  }
}

export default onClickOutside(FilterBarOptions);