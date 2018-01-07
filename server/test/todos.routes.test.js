/* eslint-env node, mocha */

let server = require('../app');
let mongoose = require('mongoose');

let chaiHttp = require('chai-http');
let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

let Todo = require('../models/todo.model');

const _task = {
	task: 'Hitting that route, yo!',
	owner: 'Walker',
	comp: true
};

chai.use(chaiHttp);

describe('Routes for /todos resources', () => {

	beforeEach((done) => {
		Todo.remove({ },(err) => {
			err ? console.error.bind(console) : console.log('DB cleared');
			done();
		});
	}); 

	// =========== READ an index of all todos
	describe('*** READ index of all todos: "/todos" route', () => {

		it('... returns a list of all current todos', (done) => {

			chai.request(server)
				.get('/todos')
				.end((err, res) => {
					expect(res.status).to.eql(200);
					expect(res.body).to.be.an('array');
					expect(res.body.length).to.eql(0);
					done();
				});
		});
	});

	// =========== CREATE a new todo item
	describe('*** CREATE a new todo item: "/todos" route', () => {

		it('...can create a new todo item', (done) => {

			chai.request(server)
				.post('/todos/')
				.send(_task)
				.end((err, res) => {
					expect(res.status).to.eql(201);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('task');
					expect(res.body).to.have.property('comp');
					expect(res.body).to.have.property('_id');
					expect(res.body._id).to.be.a('string')
					done();
				}); 	
		}); 
	});
		
	// =========== FIND a specific todo item
	describe('*** READ a specific todo item: "/todos/:id" route', () => {
		it('... can find a specific todo item', (done) => {
			let todo = new Todo(_task);

			todo.save((err, newTodo) => {
				chai.request(server)
					.get('/todos/' + newTodo.id)
					.send(newTodo)
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.an('object');
						expect(res.body).to.have.property('task');
						expect(res.body).to.have.property('comp');
						done();
					}); 
			}); 
		}); 
	}); 

	// =========== UPDATE a specific todo  
	describe('*** UPDATE a specific todo: "/todos/:id" route', () => {

		it('... can update an item', (done) => {

			let todo = new Todo(_task);
			let oldId = todo._id.toString();

			todo.save((err, newtodo) => {

				chai.request(server)
					.put('/todos/' + newtodo.id)
					.send({
						task: 'Hitting ANOTHER',
						owner: 'Johara',
						comp: "false"
					})
					.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.have.property('_id');
						expect(res.body._id).to.equal(oldId);
						expect(res.body).to.have.property('task');
						expect(res.body.task).to.eql('Hitting ANOTHER');
						expect(res.body).to.have.property('owner');
						expect(res.body.owner).to.eql('Johara');
						expect(res.body).to.have.property('comp');
						expect(res.body.comp).to.eql(false);
						expect(res.body).to.be.an('object');

						done();		
					});
			});
		});
	});

	// =========== DELETE a specific todo  
	describe('*** DELETE a specific todo: "/todos/:id" route', () => {

		it(' can delete an item', (done) => {
			
			let newTodo = new Todo(_task);

			newTodo.save((err, todo) => {

				chai.request(server)
				.delete('/todos/' + todo.id)
				.end((err, res) => {
						expect(res.status).to.eql(200);
						expect(res.body).to.be.a('object');
						console.log(res.body);
						expect(res.body.message).to.exist
						expect(res.body).to.have.property('message').eql("Successfully deleted todo item with id: " + todo.id )
					done()
				});
			});
		});
	});

});

