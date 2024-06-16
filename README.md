
# Hello

And welcome to the Recyda Coding Challenge repository. This repository a basic representation of the Recyda application and is designed as playground to fulfill several coding tasks.


# How to run the code

1. Open a terminal and clone the repository. Change directory `cd recyda-coding-challenge`

2. Install all dependencies by executing `npm install`

3. Run the application by executing `npm run start`

You will see the following message in the terminal when the application has been started:
```
> 🚀  Server ready at http://localhost:4000/
```

To explore the graph, navigate to the server address with your browser and click on `Query your server` to navigate to the Apollo Sandbox application.

---

# Coding Challenges

The challenges are divided into frontend and backend tasks. 

There are some basic rules:
- Feel free to focus on as many challenges as you like and mix frontend and backend tasks
- Go as "fullstack" as you like
- If you can implement the frontend task only, please use mock data to simulate business logic or backend responses
- There isn't any expected level of completion. Feel free to pick as many tasks you are able to do

## Frontend

This repository does not contain any frontend code. The application provides all data as a graph on the api endpoint. You can basically build your frontend as a separate project and run it against the backend. The choice of libraries is up to you, but please stay in the *React* ecosystem.

Please also provide your design thoughts and/or mockups for UI/UX for each task you did.

### 🏆 Level 1 challenges

#### 1.1 Display list of projects
✅ Display all projects in a list view with some of the projects details.

#### 1.2 Filter projects
Add a filter to the list, to filter for some attributes of the project.

### 🏆🏆 Level 2 challenges

#### 2.1 Display single project with nested structure
Create a project details view, showing the projects data and the packaging composition structure of the project.

#### 2.2 Edit projects data
Create an editable project details view, that enables editing of projects data, like layer material selection, layer weight, etc.


### 🏆🏆🏆 Level 3 challenges
 
#### 3.1 Edit project structure
Create an editable project details view, that enables editing of the projects packaging composition, like adding and removing components, layers, etc.


### 🏅 Bonus Tasks

#### Write a storybook documentation

In addition to each challenge, provide a meaningful storybook documentation.

---

## Backend

The backend application is based on [Apollo Server](https://www.apollographql.com/docs/apollo-server/v3/) and provides an Graphql API endpoint. 

##### [Models](./src/models)

The models define the base types of the application and the graphql api.

##### [Services](./src/services)

The layer for the business logic.

##### [Datasources](./src/datasources)

The layer for the (external) datasources. In this example all data is mocked as simple json files.


### 🏆 Level 1 challenges

#### 1.1 Query single project by id
✅ Create a query endpoint to query a single project.

#### 1.2 Query multiple projects with filter
✅ Create a query endpoint that accepts a filter that returns matching projects.

#### 1.3 Add dimension and volume attribute(s) for 3D packaging
✅ Extend the model to accept measurements, like width, length, height of a packaging and volume (like liters).


### 🏆🏆 Level 2 challenges

#### 2.1 Add mutation to update/add projects data
Create a mutation to update single project fields, like a layers weight or material

#### 2.2 Calculate weight of component and packaging
✅ Extend the models/services with a calculated weight of each component and packaging as a sum of all layer weights of that project.

#### 2.3 Calculate weight fraction of each layer
✅ Calculate the weight fraction of each layer, showing the layer's weight in percent of the whole packaging weight.


### 🏆🏆🏆 Level 3 challenges

#### 3.1 Add input validation for graphql inputs
Extend the model to validate input arguments, like min/max values for number fields, etc.

#### 3.2 Add a middleware to log api operations
✅ Create a middleware that logs all graphql operations to the terminal.

#### 3.3 Add mutation to copy/duplicate packagings, components and layers of projects
✅ Create a mutation to duplicate project packaging composition elements, like duplicate a component.

### 🏅Bonus challenges

#### Graph documentation
Provide descriptons/documentation on the graph model and operations. Use the existing tooling provided by the framework. 
