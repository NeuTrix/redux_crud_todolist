# redux_crud_todolist (WIP)
This is a basic CRUD application deployed on the MERN stack (Mongo, Express, React, and Nodejs).  The project is a decoupled architecture with <a href="https://github.com/NeuTrix/redux-todo-api" target="_blank" > The API </a> and its <a href="https://documenter.getpostman.com/collection/view/2246102-0bd120ea-5a37-b359-9a55-00e7a2d242c3" target="blank" >  docmentation </a> in separate repos

## Project Background

This is a React and Redux application with immutable state and
asynchronus CRUD actions for Todo list application.

- Standalone CRUD frontend app utilizing ReactJS / Redux framework
- TDD approach
- Support with datapersistence via localStorage
- Deployment via Heroku

## The stack

- ReactJS
- Redux
- React Router
- BootStrap
- Mongo/Mongoose db set up on mlab cloud

## Testing Error
After intial `yarn`, this error appears:
`TypeError: environment.teardown is not a function`

Need to go to the offending lines (112 and 144
) and comment the out.

```javascript
// line 112...
const start = Date.now();
    // yield environment.setup();
    try {

// line 144...
 } finally {
      // yield environment.teardown();
    }
```

# Application:

- React front end
- Redux for state management
- Bootstrap CSS
- CRUD actions for Todo list (Create, Read, Update, Delete)
- Data persists in localStorage
- Deployed on Heroku: https://redux-crud-project.herokuapp.com/

- Debugging Mongoose and testing suit in alt branch

## Web resources
- tutorial at: https://coursework.vschool.io/mongoose-crud/
- Testing resource: https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22

## Testing


# UI Optimization
### Chrome
- iPhone X
