const express = require('express');

const app = express();

app.get('/api/customer', (req, res) => {
	const customers = [
		{id: 1, first_name: 'John', last_name: 'Doe'},
		{id: 2, first_name: 'Steve', last_name: 'Smith'},
		{id: 3, first_name: 'Mary', last_name: 'Swanson'}
	];

	res.json(customers);
});

app.get('/api/review', (req, res) => {
	const reviews = [
		{id: 1, name: "Daffy Duck", score: 5, text: "So good!", school: "Emory University", dining_hall: "DUC-ling", meal: "Dinner", date: new Date('October 1, 2018 03:24:00')},
		{id: 2, name: "Bugs Bunny", score: 1, text: "EWWWWWWWWWWW WHAT????", school: "Emory University", dining_hall: "DUC-ling", meal: "Lunch", date: new Date('December 11, 2018 08:24:00')},
		{id: 3, name: "Donald Duck", score: 4, text: "Yum yum yum!", school: "Emory University", dining_hall: "DUC-ling", meal: "Breakfast", date: new Date('December 10, 2018 03:24:00')},
		{id: 4, name: "Mickey Mouse", score: 2, text: "Golly Gee, this is gross!", school: "Emory University", dining_hall: "DUC-ling", meal: "Dinner", date: new Date('December 25, 2018 10:22:00')},
		{id: 5, name: "Pooh Bear", score: 3, text: "I should stop eating so much...", school: "Emory University", dining_hall: "DUC-ling", meal: "Dinner", date: new Date('January 17, 2018 02:15:00')}
	]

	res.json(reviews)
});

app.get('/api/menu/school/:school/eatery/:eatery/year/:year/month/:month/day/:day', (req, res) => {
	console.log(req.params);
	let date = new Date(parseInt(req.params.year), parseInt(req.params.month), parseInt(req.params.day), 0, 0, 0, 0);
	console.log(date.toISOString());
	const menus = {
		'lunch': {
			'Special One': 1,
			'Special Two': 2,
			'Special Three': 3,
			'Special Four': 4,
			'Special Five': 5,
			'Special Six': 1,
			'Special Seven': 2,
			'Special Eight': 3,
			'Special Nine': 4,
			'Special Ten': 5
		},
		'dinner': {
			'Special One': 5,
			'Special Two': 4,
			'Special Three': 3,
			'Special Four': 2,
			'Special Five': 1,
			'Special Six': 5,
			'Special Seven': 4,
			'Special Eight': 3,
			'Special Nine': 2,
			'Special Ten': 1
		}
	}
	console.log(menus);

	res.json(menus);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));