import React from 'react';
import MaterialIcon from 'material-icons-react';

class DailyMenus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mealStatuses: [true, false, false],
      generalMenuStatus: false,
      meals: ["Breakfast", "Lunch", "Dinner"],
      specialMenu: [['Special One', 'Special Two', 'Special Three', 'Special Four', 'Special Five', 'Special Six', 'Special Seven', 'Specal Eight', 'Special Nine', 'Special Ten'],
                    ['Special One', 'Special Two', 'Special Three', 'Special Four', 'Special Five', 'Special Six', 'Special Seven', 'Specal Eight', 'Special Nine', 'Special Ten'],
                    ['Special One', 'Special Two', 'Special Three', 'Special Four', 'Special Five', 'Special Six', 'Special Seven', 'Specal Eight', 'Special Nine', 'Special Ten']],
      specialMenuItemScores: [[],[],[]],
      specialMenuThumbs: [[],[],[]],
      generalMenu: [['Scrambled Tofu', 'Scrambled Eggs', 'Bacon', 'Turkey Bacon', 'Chicken Sausage', 'Pork Sausage', 'Turkey Sausage', 'Vegan Sausage Link', 'Biscuit', 'Hash Browns', 'Breakfast Potatoes', 'Tater Tots', 'Buttermilk Pancakes', 'Texas French Toast', 'Low Fat Fruit Yogurt', 'Lowfat Vanilla Yogurt', 'Plain Greek Yogurt', 'Cottage Cheese', 'Belgian Waffle', 'Pancake Syrup'],
                    ['Cheese Pizza', 'Pepperoni Pizza', 'Vegetable Pizza', 'Grilled Springer Mountain Farms Chicken Breast', 'Roasted Vegetables', 'Roasted Portobello Mushroom', 'White Oak Pastures Grass-fed Beef Patty', 'All-beef Hot Dog', 'Sweet Potato Fries', 'French Fries', 'Creamy Mashed Potatoes', 'House-made Potato Chips', 'Hard-boiled Egg (1 Each)', 'Tofu', 'Chicken Breast', 'Tuna'],
                    ['Cheese Pizza', 'Pepperoni Pizza', 'Vegetable Pizza', 'Grilled Springer Mountain Farms Chicken Breast', 'Roasted Vegetables', 'Roasted Portobello Mushroom', 'White Oak Pastures Grass-fed Beef Patty', 'All-beef Hot Dog', 'Sweet Potato Fries', 'French Fries', 'Creamy Mashed Potatoes', 'House-made Potato Chips', 'Hard-boiled Egg (1 Each)', 'Tofu', 'Chicken Breast', 'Tuna']],
      generalMenuItemScores: [[],[],[]],
      generalMenuThumbs: [[],[],[]]
    }
    for (let i = 0; i < this.state.meals.length; i++) {
      this.state.generalMenuThumbs[i] = Array.apply(null, Array(this.state.generalMenu[i].length)).map(Number.prototype.valueOf,0);
      this.state.specialMenuThumbs[i] = Array.apply(null, Array(this.state.specialMenu[i].length)).map(Number.prototype.valueOf,0);
    }
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    console.log("RENDER: DailyMenus");
  	return (
  		<div className="coloredHeaderContentInnerContainer">
        <div className="menuTitlesContainer">
          {this.renderMenuTitles()}
        </div>
        <div className="standardDivider noMargin"></div>
        {this.renderMenu(this.props, 0)}
        {this.renderMenu(this.props, 1)}
        {this.renderMenu(this.props, 2)}
      </div>
  	);
  }

  renderMenuTitles() {
    let menuTitles = []
    for (let i = 0; i < this.state.meals.length; i++) {
      menuTitles.push(this.renderMenuTitle(i, this.state.meals[i], this.state.mealStatuses[i]));
    }
    return menuTitles;
  }

  renderMenuTitle(index, meal, isActive) {
    const titleClass = isActive ? "standardText standardTextPaddingHorizontal button menuTitle active" : "standardText standardTextPaddingHorizontal button menuTitle";
    return(
      <div key={index} className={titleClass} onClick={isActive ? null : () => this.handleMenuClick(meal)}>{meal}</div>
    );
  }

  renderMenu(props, index) {
    let menuItemsGeneral = [];
    let menuItemsSpecial = [];
    const relevantMenuGeneral = this.state.generalMenu[index].slice();
    const relevantMenuSpecial = this.state.specialMenu[index].slice();
    for (let i = 0; i < relevantMenuSpecial.length; i++) {
      menuItemsSpecial.push(this.renderMenuItem(props, "special", relevantMenuSpecial[i], index, i, this.state.specialMenuThumbs[index][i]));
    }
    for (let i = 0; i < relevantMenuGeneral.length; i++) {
      menuItemsGeneral.push(this.renderMenuItem(props, "general", relevantMenuGeneral[i], index, i, this.state.generalMenuThumbs[index][i]));
    }
    return (
      <DailyMenu
        isActive={this.state.mealStatuses[index]}
        generalIsActive={this.state.generalMenuStatus}
        onMenuClick={() => this.handleMenuClick(this.state.meals[index])}
        onGeneralClick={() => this.handleGeneralMenuClick(this.state.meals[index])}
        meal={this.state.meals[index]}
        menuItemsSpecial={menuItemsSpecial}
        menuItemsGeneral={menuItemsGeneral}
      />
    );
  }

  renderMenuItem(props, menu_type, item, menu_index, item_index, thumb) {
    var score;
    const numbers = ["one", "two", "three", "four", "five"];
    const menuItemRateBackgroundClass = thumb === 0 ? "menuItemRateBackground" : "menuItemRateBackground active";
    const menuItemRatedContainerClass = thumb === 0 ? "menuItemRatedContainer" : "menuItemRatedContainer active";
    let thumbUpClass;
    let thumbDownClass;
    let thumbRatedDirection;
    let thumbRatedColor;
    if (thumb === 1) {
      thumbUpClass = "menuItemRateThumb button up active";
      thumbDownClass = "menuItemRateThumb button down inactive";
      thumbRatedDirection = "thumb_up";
      thumbRatedColor = "#4caf50";

    } else if (thumb === -1) {
      thumbUpClass = "menuItemRateThumb button up inactive";
      thumbDownClass = "menuItemRateThumb button down active";
      thumbRatedDirection = "thumb_down";
      thumbRatedColor = "#f44336";
    } else if (thumb === 0) {
      thumbUpClass = "menuItemRateThumb button up";
      thumbDownClass = "menuItemRateThumb button down";
      thumbRatedDirection = "thumb_up";
      thumbRatedColor = "#bdbdbd";
    } else {
      console.log("ERROR: thumb");
    }

    if (this.state.generalMenuItemScores[menu_index].length !== this.state.generalMenu[menu_index].length) {
      score = Math.trunc(Math.random() * 5);
      this.state.generalMenuItemScores[menu_index].push(score);
    } else {
      score = this.state.generalMenuItemScores[menu_index][item_index];
    }
    const menuItemTextClass = thumb === 0 ? "standardText menuItemText " + numbers[score] : "standardText menuItemText active " + numbers[score];
    let iconStyle = {
      color: thumbRatedColor,
      fontSize: '16px'
    };
    return (
      <div key={menu_index + "_" + item_index} className={menuItemTextClass}>
        <p>{item}</p>
        <div className={menuItemRatedContainerClass}>
          <div className="menuItemRatedThumb"><i className="material-icons 16 md-dark" style={iconStyle}>{thumbRatedDirection}</i></div>
        </div>
        <div className="menuItemRateContainer">
          <div className={menuItemRateBackgroundClass}></div>
          <div className={thumbUpClass} onClick={() => this.handleThumbClick(1, menu_type, menu_index, item_index)}><MaterialIcon icon="thumb_up" color="#4caf50" size="16"/></div>
          &nbsp;&nbsp;
          <div className={thumbDownClass} onClick={() => this.handleThumbClick(-1, menu_type, menu_index, item_index)}><MaterialIcon icon="thumb_down" color="#f44336" size="16"/></div>
        </div>
      </div>
    );
  }

  handleMenuClick(meal) {
    const meals = this.state.meals.slice();
    const index = meals.indexOf(meal);
    const mealStatuses = [false, false, false]
    mealStatuses[index] = !this.state.mealStatuses[index];
    this.setState({
      mealStatuses: mealStatuses
    });
  }

  handleGeneralMenuClick(meal) {
    this.setState({
      generalMenuStatus: !this.state.generalMenuStatus
    });
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

function DailyMenu(props) {
  const contentClass = props.isActive ? "menuContainer active" : "menuContainer";
  const generalMenuContainerClass = props.generalIsActive ? "generalMenuContainer active" : "generalMenuContainer";
  const generalMenuSubtitleIconContainerClass = props.generalIsActive ? "menuSubtitleGeneralIconContainer button active" : "menuSubtitleGeneralIconContainer button";

  return (
    <div>
      {/*<a className={titleClass} onClick={props.onMenuClick}>{props.meal}<br/></a>*/}
      <div className={contentClass}>
        <div className="standardDivider menuDivider"></div>
        <div className="standardText menuSubtitleSpecial"><div className="menuSubtitleGeneralContainer">Specials</div></div>
        <div className="standardClear"></div>
        <div>{props.menuItemsSpecial}</div>
        <div className="menuSectionDivider"></div>
        <div className="standardDivider menuDivider"></div>
        <div className="standardText menuSubtitleGeneral button" onClick={props.onGeneralClick}><div className="menuSubtitleGeneralContainer">General&nbsp;<div className={generalMenuSubtitleIconContainerClass}><MaterialIcon icon="keyboard_arrow_down" color="#bdbdbd" size="16"/></div></div></div>
        <div className="standardClear"></div>
        <div className={generalMenuContainerClass}>{props.menuItemsGeneral}</div>
      </div>
    </div>
  );
}

export default DailyMenus;