import React from 'react';
import FilterBarItem from './filterBarItem.js';
import TextareaAutosize from 'react-autosize-textarea';

class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.handleOptionActivation = this.handleOptionActivation.bind(this)
    this.handleReviewTextValueChange = this.handleReviewTextValueChange.bind(this);
    this.reviewCharacterLimit = 500;
    this.state = {
      reviewTextValue: "",
      score: null,
      school: 'Emory University',
      diningHall: 'DUC-ling',
      meal: 'Breakfast',
      hasScoreWarning: false,
      hasTextWarning: false
    };
  }

  submitReview() {

    // Form validation
    let failure = false;
    let score = this.state.score;
    let reviewText = this.state.reviewTextValue;
    if (score === null) {
      this.setState({
        hasScoreWarning: true
      });
      failure = true;
    }
    if (reviewText.length === 0) {
      this.setState({
        hasTextWarning: true
      });
      failure = true;
    }
    if (failure) { 
      return; 
    }

    let school = this.state.school;
    let diningHall = this.state.diningHall;
    let meal = this.state.meal;
    let name = this.generateReviewerName();
    console.log(
      "Name: " + name + "\n" +
      "Text: " + reviewText + "\n" +
      "Score: " + score + "\n" +
      "School: " + school + "\n" +
      "Dining Hall: " + diningHall + "\n" +
      "Meal: " + meal + "\n"
    );
  }

  handleReviewTextValueChange(event) {
    if (event.target.value.length <= this.reviewCharacterLimit) {
      this.setState({
        reviewTextValue: event.target.value
      });
    } else {
      this.setState({
        reviewTextValue: event.target.value.substring(0, this.reviewCharacterLimit),
        hasTextWarning: true
      });
      return;
    }
  }

  handleOptionActivation(type, option) {
    console.log(type + " " + option);
    if (type === 'diningHall') {
      this.setState({
        diningHall: option
      });
    } else if (type === 'meal') {
      this.setState({
        meal: option
      });
    }
  }

  handleScoreClick(score) {
    this.setState({
      score: score
    });
  }

  render() {
    console.log("RENDER: writeReview");

    // Score bar CSS
    let writeReviewDisplayScoreBarUnitFillClass1;
    let writeReviewDisplayScoreBarUnitFillClass2;
    let writeReviewDisplayScoreBarUnitFillClass3;
    let writeReviewDisplayScoreBarUnitFillClass4;
    let writeReviewDisplayScoreBarUnitFillClass5;
    if (this.state.score === 5) {
      writeReviewDisplayScoreBarUnitFillClass1 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass2 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass3 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass4 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass5 = "standardText writeReviewDisplayScoreBarUnitFill active";
    } else if (this.state.score === 4) {
      writeReviewDisplayScoreBarUnitFillClass1 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass2 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass3 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass4 = "standardText writeReviewDisplayScoreBarUnitFill active";
      writeReviewDisplayScoreBarUnitFillClass5 = "standardText writeReviewDisplayScoreBarUnitFill";
    } else if (this.state.score === 3) {
      writeReviewDisplayScoreBarUnitFillClass1 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass2 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass3 = "standardText writeReviewDisplayScoreBarUnitFill active";
      writeReviewDisplayScoreBarUnitFillClass4 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass5 = "standardText writeReviewDisplayScoreBarUnitFill";
    } else if (this.state.score === 2) {
      writeReviewDisplayScoreBarUnitFillClass1 = "standardText writeReviewDisplayScoreBarUnitFill filled";
      writeReviewDisplayScoreBarUnitFillClass2 = "standardText writeReviewDisplayScoreBarUnitFill active";
      writeReviewDisplayScoreBarUnitFillClass3 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass4 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass5 = "standardText writeReviewDisplayScoreBarUnitFill";
    } else if (this.state.score === 1) {
      writeReviewDisplayScoreBarUnitFillClass1 = "standardText writeReviewDisplayScoreBarUnitFill active";
      writeReviewDisplayScoreBarUnitFillClass2 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass3 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass4 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass5 = "standardText writeReviewDisplayScoreBarUnitFill";
    } else {
      writeReviewDisplayScoreBarUnitFillClass1 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass2 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass3 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass4 = "standardText writeReviewDisplayScoreBarUnitFill";
      writeReviewDisplayScoreBarUnitFillClass5 = "standardText writeReviewDisplayScoreBarUnitFill";
    }

    // Review status CSS
    let scoreStatusClass = "writeReviewStatusContainer" 
      + (this.state.score != null ? " pass" : " neutral") 
      + (this.state.hasScoreWarning ? " warned" : "");
    let scoreStatusText = "";
    if (this.state.score === null) {
      scoreStatusText = "Score required"
    } else if (this.state.score === 1) {
      scoreStatusText = "1 - Yuck!";
    } else if (this.state.score === 2) {
      scoreStatusText = "2 - Disliked it"
    } else if (this.state.score === 3) {
      scoreStatusText = "3 - Neutral"
    } else if (this.state.score === 4) {
      scoreStatusText = "4 - Liked it"
    } else if (this.state.score === 5) {
      scoreStatusText = "5 - Yum!"
    }
    let textStatusClass = "writeReviewStatusContainer" 
      + (this.state.reviewTextValue.length === 0 || this.state.reviewTextValue.length > this.reviewCharacterLimit ? " neutral" : " pass") 
      + (this.state.hasTextWarning ? " warned" : "");
    let textStatusText = this.state.reviewTextValue.length === 0 ? "Text required" : (this.state.reviewTextValue.length + "/" + this.reviewCharacterLimit);

    return(
      <div className="standardContentContainer writeReviewContainer bottomBorder">
        <TextareaAutosize 
          maxRows={10} 
          autoFocus 
          className="writeReviewInput" 
          placeholder={"How was " + this.state.meal.toLowerCase() + " at " + this.state.school + "'s " + this.state.diningHall + "?"}
          ref="reviewText"
          value={this.state.reviewTextValue}
          onChange={this.handleReviewTextValueChange}/>
        <div className="writeReviewBar">
          <div className="flexDivider writeReviewFlexDivider noBottomMargin noTopMargin"></div>
          <div className="writeReviewFilterBarContainer">
            {/*
            <div className="filterBarSectionContainer">
              <a className="filterBarActivationContainer">
                <div className="standardText filterBarActivationButton">
                  <MaterialIcon icon="location_on" color="#757575"/>
                </div>
                <div className="standardText filterBarName">
                  Emory University
                </div>
              </a>
            </div>
            <div className="filterBarActivationDivider"></div>
            */}
            <div className="writeReviewDisplayScoreBar">
              <div id="writeReviewDisplayScoreBarUnit5" className="writeReviewDisplayScoreBarUnit button" onClick={() => this.handleScoreClick(5)}><div className={writeReviewDisplayScoreBarUnitFillClass5}>5</div></div>
              <div id="writeReviewDisplayScoreBarUnit4" className="writeReviewDisplayScoreBarUnit button" onClick={() => this.handleScoreClick(4)}><div className={writeReviewDisplayScoreBarUnitFillClass4}>4</div></div>
              <div id="writeReviewDisplayScoreBarUnit3" className="writeReviewDisplayScoreBarUnit button" onClick={() => this.handleScoreClick(3)}><div className={writeReviewDisplayScoreBarUnitFillClass3}>3</div></div>
              <div id="writeReviewDisplayScoreBarUnit2" className="writeReviewDisplayScoreBarUnit button" onClick={() => this.handleScoreClick(2)}><div className={writeReviewDisplayScoreBarUnitFillClass2}>2</div></div>
              <div id="writeReviewDisplayScoreBarUnit1" className="writeReviewDisplayScoreBarUnit button" onClick={() => this.handleScoreClick(1)}><div className={writeReviewDisplayScoreBarUnitFillClass1}>1</div></div>
              {/*<p className="standardText writeReviewScoreTitle">Score =</p>*/}
            </div>
            <div className="filterBarActivationDivider"></div>
            <FilterBarItem 
              key={0}
              type="diningHall"
              icon="store"
              options={["DUC-ling", "Rollin's Café", "SAAC Café", "Ray's at WREC"]} 
              activeOption={0}
              parentActivation={this.handleOptionActivation}
            />
            <div className="filterBarActivationDivider"></div>
            <FilterBarItem 
              key={1}
              type="meal"
              options={["Breakfast", "Lunch", "Dinner"]} 
              icon="fastfood"
              activeOption={0}
              parentActivation={this.handleOptionActivation}
            />
          </div>
          <div className="flexDivider writeReviewFlexDivider noTopMargin"></div>
          {/*
          <p className="standardText writeReviewDescriptionText">
            <span className="reviewDate">{this.state.school}</span>&nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;{this.state.diningHall}</span>&nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;{this.state.meal}</span>
          </p>
          */}
          <div className="standardContentFlexRow writeReviewStatusFlexRow">
            <div className={textStatusClass}>
              <p className="standardText writeReviewStatusText">{textStatusText}</p>
            </div>
            <div className={scoreStatusClass}>
              <p className="standardText writeReviewStatusText">{scoreStatusText}</p>
            </div>
          </div>
          <div className="writeReviewLink button z-depth-1" onClick={() => this.submitReview()}>
            <span>Quack</span>
          </div>
        </div>
      </div>
    );
  };

  generateReviewerName() {
    const adjectives = [
      ['Awkward'],
      ['Beautiful'],
      ['Cool'],
      ['Daffy'],
      ['Earnest'],
      ['Fablulous'],
      ['Goofy'],
      ['Hungry'],
      ['Important'],
      ['Joyful'],
      ['Knowledgable'],
      ['Likable'],
      ['Musical'],
      ['Noble'],
      ['Okay'],
      ['Purple'],
      ['Queasy'],
      ['Ruthless'],
      ['Shiny'],
      ['Teenage'],
      ['Upstanding'],
      ['Verbose'],
      ['Wholesome'],
      ['Xenodochial'],
      ['Yucky'],
      ['Zealous'],
    ];
    const names = [
      ['Airplane', 'Albatross'],
      ['Bluebird', 'Bobolink'],
      ['Crow', 'Chickadee'],
      ['Duck', 'Dove'],
      ['Eagle', 'Egret'],
      ['Falcon', 'Finch'],
      ['Goose', 'Grosbeak'],
      ['Hawk', 'Hummingbird'],
      ['Ibis', 'Iiwi'],
      ['Jay' ,'Jaeger'],
      ['Kite', 'Kingbird'],
      ['Loon', 'Limpkin'],
      ['Magpie', 'Mallard'],
      ['Nighthawk', 'Nutcracker'],
      ['Owl', 'Ostrich'],
      ['Pelican', 'Pidgeon'],
      ['Quail', 'Queen'],
      ['Raven', 'Razorbill'],
      ['Sandpiper', 'Sparrow'],
      ['Thrasher', 'Turkey'],
      ['Ugisu', 'Umbrellabird'],
      ['Vulture', 'Vireo'],
      ['Wagtail', 'Warbler'],
      ['Xylophone'],
      ['Yellowlegs', 'Yellowthroat'],
      ['Zebra'],
    ]

    const adjective_index = parseInt(Math.random() * adjectives.length, 10);
    const adjective_subindex = parseInt(Math.random() * adjectives[adjective_index].length, 10);
    const name_index = parseInt(Math.random() * names.length, 10);
    const name_subindex = parseInt(Math.random() * names[name_index].length, 10);

    return "" + adjectives[adjective_index][adjective_subindex] + " " + names[name_index][name_subindex];
  }
}

export default WriteReview;