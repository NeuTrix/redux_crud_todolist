let Todo = require('../models/todo.model');
let _ = require('lodash');
let Promise = require('bluebird');
let faker = require('faker');

let mongoose = require('mongoose');

let mongoDB = 'mongodb://Tester:test2015@ds239117.mlab.com:39117/todo-test-db';

// establish pending connection to db
mongoose.connect(mongoDB);
// use the global Promise library
// mongoose.Promise = global.Promise;
// default connection
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const Close = () => {
	mongoose.connection.close()
	console.log("********** Connection Closed ******")
}

const Clear =() => {
	Todo.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('DB cleared');
		});
	console.log("********** db Cleared ******")
}

// ========= The Seed Module

const Seed = (count) => {

_.times(count,() => {
	let _task = {
		owner: faker.name.lastName(),
		task: faker.lorem.sentence(),
		details: faker.lorem.paragraph(),
		rank: faker.random.number(5),
		date: faker.date.future().getUTCFullYear().toString(),
		comp: faker.random.boolean()
	};

	let todo = new Todo(_task)

	todo.save((err, todo) => {
		console.log(todo)
	})
})

}


module.exports = { Seed, Close, Clear };


