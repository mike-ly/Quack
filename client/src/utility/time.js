module.exports = {

	dateToShortEstimateString: function(date) {
		let curr_date = new Date();
		let time_difference = (curr_date - date) / 1000;

		let value, unit, plural;

		// Smallest estimate is in seconds.
		if (time_difference < 60) {
			unit = "second";
			value = time_difference; 

		// Smallest estimate is in minutes.
		} else if (time_difference < 60 * 60) {
			unit = "minute";
			value = time_difference / (60);

		// Smallest estimate is in hours.
		} else if (time_difference < 60 * 60 * 24) {
			unit = "hour";
			value = time_difference / (60 * 60);

		// Smallest estimate is in days.
		} else if (time_difference < 60 * 60 * 24 * 7) {
			unit = "day";
			value = time_difference / (60 * 60 * 24);

		// Smallest estimate is in weeks.
		} else if (time_difference < 60 * 60 * 24 * 7 * 4) {
			unit = "week";
			value = time_difference / (60 * 60 * 24 * 7);

		// Smallest estimate is in months.
		} else if (time_difference < 60 * 60 * 24 * 365) {
			unit = "month";
			value = time_difference / (60 * 60 * 24 * 30);

		// Smallest estimate is in years.
		} else {
			unit = "year";
			value = time_difference / (60 * 60 * 24 * 365);
		}

		value = parseInt(value);
		plural = value == 1 ? "" : "s";

		return `${value} ${unit}${plural}`;
	}

}