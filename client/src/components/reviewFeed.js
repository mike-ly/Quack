import React from 'react';
import {dateToShortEstimateString} from '../utility/time.js';

class ReviewFeed extends React.Component {
  constructor(props) {
    super(props);
    this.currentDate = new Date();
    this.state = {
      feed: []
    };
  }

  componentDidChange() {
    console.log(this.state);
  }

  componentDidMount() {
    let feed = this.state.feed.slice();
    let variable = this;
    fetch('/api/review')
      .then(res => res.json())
      .then(reviews => 
        reviews.forEach(function(review) {
          variable.appendReviewToFeed(review.name, review.score, review.text, review.school, review.dining_hall, review.meal, review.date);
        })
      )
  }

  appendReviewToFeed(name, score, text, school, diningHall, meal, date) {
    let feed = this.state.feed.slice();
    if (feed.length > 0) {
      feed.push(<div key={feed.length} className="standardDivider"></div>);
    }
    feed.push(this.renderReview(feed.length, name, score, text, school, diningHall, meal, date));
    this.setState({
      feed: feed
    });
  }

  renderReview(key, name, score, text, school, diningHall, meal, date) {
    date = new Date(date);
    const dateString = dateToShortEstimateString(date) + " ago"
    
    return(
      <p key={key} className="standardText standardTextPaddingHorizontal standardTextPaddingVertical">
        <b>{name}</b>
        &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;{dateString}</span>
        &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;{school}</span>
        &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;{diningHall}</span>
        &nbsp;&nbsp;<span className="reviewDate">&bull;&nbsp;&nbsp;{meal}</span><br/>
        {text}
      </p>
    );
  }

  render() {
    console.log("RENDER: Reviewreviews");
    return(
      <div>
        {this.state.feed}
      </div>
    );
  };
}

export default ReviewFeed;