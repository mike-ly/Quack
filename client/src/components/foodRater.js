import React from 'react';
import MaterialIcon from 'material-icons-react';

class FoodRater extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			thumbStatus: 0
		}
	}

  render() {
  	const menuItemRateBackgroundClass = this.state.thumbStatus === 0 ? "menuItemRateBackground" : "menuItemRateBackground active";
    const menuItemRatedContainerClass = this.state.thumbStatus === 0 ? "menuItemRatedContainer" : "menuItemRatedContainer active";
  	let thumbUpClass;
    let thumbDownClass;
    let thumbRatedDirection;
    let thumbRatedColor;
    if (this.state.thumbStatus === 1) {
      thumbUpClass = "menuItemRateThumb button up active";
      thumbDownClass = "menuItemRateThumb button down inactive";
      thumbRatedDirection = "thumb_up";
      thumbRatedColor = "#4caf50";

    } else if (this.state.thumbStatus === -1) {
      thumbUpClass = "menuItemRateThumb button up inactive";
      thumbDownClass = "menuItemRateThumb button down active";
      thumbRatedDirection = "thumb_down";
      thumbRatedColor = "#f44336";
    } else if (this.state.thumbStatus === 0) {
      thumbUpClass = "menuItemRateThumb button up";
      thumbDownClass = "menuItemRateThumb button down";
      thumbRatedDirection = "thumb_up";
      thumbRatedColor = "#bdbdbd";
    } else {
      console.error("ERROR: thumb");
    }
    let iconStyle = {
      color: thumbRatedColor,
      fontSize: '16px'
    };

  	return (
  		<div>
	  		<div className={menuItemRatedContainerClass}>
	        <div className="menuItemRatedThumb"><i className="material-icons 16 md-dark" style={iconStyle}>{thumbRatedDirection}</i></div>
	      </div>
	  		<div className="menuItemRateContainer">
	        <div className={menuItemRateBackgroundClass}></div>
	        <div className={thumbUpClass} onClick={() => this.handleThumbClick(1, this.props.dbKey)}><MaterialIcon icon="thumb_up" color="#4caf50" size="16"/></div>
	        &nbsp;&nbsp;
	        <div className={thumbDownClass} onClick={() => this.handleThumbClick(-1, this.props.dbKey)}><MaterialIcon icon="thumb_down" color="#f44336" size="16"/></div>
	      </div>
	    </div>
  	);
  }

  handleThumbClick(thumb, menu_type, menu_index, item_index) {
    let menuThumbs;
    if (menu_type === "special") {
      menuThumbs = this.state.specialMenuThumbs.slice();
    } else if (menu_type === "general") {
      menuThumbs = this.state.generalMenuThumbs.slice();
    } else {
      console.log("ERROR: menuThumbs");
    }
    if (menuThumbs[menu_index][item_index] !== thumb) {
      menuThumbs[menu_index][item_index] = thumb
      if (menu_type === "special") {
        this.setState({
          specialMenuThumbs: menuThumbs
        });
      } else if (menu_type === "general") {
        this.setState({
          generalMenuThumbs: menuThumbs
        });
      }
    } else {
      menuThumbs[menu_index][item_index] = 0;
      if (menu_type === "special") {
        this.setState({
          specialMenuThumbs: menuThumbs
        });
      } else if (menu_type === "general") {
        this.setState({
          generalMenuThumbs: menuThumbs
        });
      }
    }
  }

}

export default FoodRater;