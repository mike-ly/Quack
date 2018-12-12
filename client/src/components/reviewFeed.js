import React from 'react';

class ReviewFeed extends React.Component {
  constructor(props) {
    super(props);
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const days = ["Sunday", "Monday", "Tuesday", "Wedenesday", "Thursday", "Friday", "Saturday"];
    this.currentDate = new Date();
    this.state = {
      reviews: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
  }

  componentDidMount() {
    let reviews = this.state.reviews.slice();
    fetch('/api/review')
      .then(res => res.json())
      .then(reviews => this.setState({reviews: reviews}, () => console.log('reviews fetched...', reviews)));
    // this.renderReview(item.id, item.name, item.score, item.school, item.dining_hall, item.meal, item.date);
    // this.setState({
    //   reviews: reviews
    // });
  }

  appendReviewToreviews(reviews, name, score, text, school, diningHall, meal, date) {
    console.log(reviews.length);
    if (reviews.length > 0) {
      reviews.push(<div key={reviews.length} className="standardDivider"></div>);
    }
    reviews.push(this.renderReview(reviews.length, name, score, text, school, diningHall, meal, date));
    return reviews;
  }

  renderReview(key, name, score, text, school, diningHall, meal, date) {
    let hourString = "";
    let minuteString = "";
    
    date = new Date(date);
    let timeDifference = (new Date().getTime()) - date.getTime();
    let minuteDifference = parseInt(timeDifference / 1000 / 60, 10);
    if (minuteDifference < 0) {
      console.log("ERROR: review from the future: ", timeDifference,  date, new Date());
    }
    let hours = parseInt(minuteDifference / 60, 10);
    let minutes = minuteDifference % 60;

    let andString = "";
    if (hours > 0 && minutes > 0) {
      andString = " and";
    }
    if (hours === 0) {
      hourString = "";
    } else if (hours > 1) {
      hourString = hours + " hours";
    } else if (hours > 0) {
      hourString = hours + " hour";
    }
    if (minutes === 0) {
      minuteString = "";
    } else if (minutes > 1) {
      minuteString = " " + minutes + " minutes";
    } else if (minutes > 0) {
      minuteString = " " + minutes + " minute";
    }
    const dateString = hourString + andString + minuteString + " ago";
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
        {this.state.reviews.map(item => 
          this.renderReview(item.id, item.name, item.score, item.text, item.school, item.dining_hall, item.meal, item.date)
        )}
      </div>
    );
  };
}

export default ReviewFeed;