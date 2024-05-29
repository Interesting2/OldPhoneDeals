# Project Title

OldPhoneDeals is a web application that allows users to buy and sell old phones. It is built with React, Node.js, Express and MongoDB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them
* Node.js
* MongoDB
* All dependencies in package.json in both frontnd and backend folders

```
cd frontend
npm install

cd backend
npm install
```

## Import dataset
To import dataset we use MongoDB compass. First create a database called "OldPhoneDeals" and two collections. One named "Users", the other named "PhoneListings". Then import the dataset into the collection.

For the User collection, one must add a new field for each user, called "isVerified", and set it to true. This is for login purpose.

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo


## How to run the application locally

Go to the frontend folder and do npm start. Then go to the backend folder and do npm run dev. The application/frontend should be running on localhost:3000 and the backend should be running on localhost:3500.

```
cd frontend
npm run start

cd backend
npm run dev
```

## Built With
* [React](https://reactjs.org/docs/getting-started.html) - The web framework used
* [Node.js](https://nodejs.org/en/docs/) - Dependency Management
* [Express](https://expressjs.com/en/4x/api.html) - Used to generate RSS Feeds
* [MongoDB](https://docs.mongodb.com/) - Used to generate RSS Feeds
* [Mongoose](https://mongoosejs.com/docs/guide.html) - Used to generate RSS Feeds
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **IoTouLei** - *Initial work* - [PurpleBooth](https://github.sydney.edu.au/ilei0920)
* **ZhiHengWang** - *Initial work* - [PurpleBooth](https://github.sydney.edu.au/zwan2773)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details





