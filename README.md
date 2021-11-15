# React Test - New Year Chaos Problem

A simple project of REST API with NodeJs, MongoDB, Create-react-application, redux some unit test in Chai-http.

## Logic of the application

REST service (JSON/HTTP) for storing input of a problem and its corresponded solution

Each entry has:

- a UID (`_id`)
- an array of number (`queue`)
- its solution (`solution`)

`solution` is an object of:

- count of bribed required, solution of the problem (`bribed`)
- if the solution for the problem is too chaotic (`tooChaotic`)
- array of details for every step (`details`)

`details` is an object of:

- array of position in this particular step (`queue`)
- the index for the person in the `queue` who bribe (`indexA`)
- the index for the person in the `queue` bribed (`indexB`)

## Technologys used

- [NodeJs v14.18.0](https://nodejs.org)
- [MongoDB v4.4.2](https://mongodb.com) NoSQL database
- [Mongoose v5.11.8](https://mongoosejs.com) ORM
- [Express v4.16.1](https://expressjs.com) framework for NodeJs
- [Swagger v2.0](https://swagger.io) with [OpenAPI v3.0.0](https://openapis.org) for document the API
- [ReactJs v17.0.2](https://reactjs.org) with the [create-react-application](https://create-react-app.dev/docs/getting-started) command
- [Redux v4.1.2](https://redux.js.org)
- [Chai-Http v4.3.0](https://chaijs.com/plugins/chai-http) for unit test the API
- [Sass v1.43.0](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)
- [Ant-Design v4.16.13](https://ant.design/) for frontend views

## Project structure

This repository is structured in a specific way

```
-api
-client
...
```

The `api` folder holds all the source code of the NodeJs + Express + MongoDb application and there is `README.md` file with the installation process of the API. The `client` folder holds all the source code from the React + Redux application and also there is a `README.md` file with the installation process for the `client`.

## Installation

### API server installation

First clone the project

```
git clone https://github.com/FrankSiret/react-test--bribed.git
```

then move to `api` folder and install dependencies for the `api` with your favorite package manager

```
cd api
npm install
```

or

```
cd api
yarn install
```

if required configure ports and database name in `config` folder in the differents enviroments json files:

```
- dev.json
- prod.json
- test.json
```

and then run the API server:

```
npm run start:dev
```

the server should be listening at [http://localhost:5000](http://localhost:5000) for run unit test use the command:

```
npm run start:test
```

### Client installation

For client installation open another `cmd` make shure that you are at the root directory of the project and then run:

```
cd client
npm install
```

or

```
cd client
yarn install
```

when it finish run the client with the command:

```
yarn start
```

the client should then be listennig at [http://localhost:3000](http://localhost:3000)

## Contact

Frank Rodríguez Siret

- Email: frank.siret@gmail.com
- Linkedin: [Frank Rodríguez Siret](https://www.linkedin.com/in/frank-siret)
- Website: [Resume CV](https://franksiret.github.io/resume-cv)
