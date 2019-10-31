# Kiana
[![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/)

Kiana is API Gateway for a home automation device using MQTT & nodeJS.
The project idea was born when i was trying to manage & make an interface of my weather sensor & triggering to my IOT Device. So i made this project to solve that issue

#### The Diagram
![kiana](https://user-images.githubusercontent.com/22183588/67885277-e00be000-fb79-11e9-8203-bdc16cc0253c.png) 

## Getting Started

This project require MQTT broker, influxDB & redis

Create .env:

```
cp .env.example .env
```

Install the dependencies:

```
npm install
```

Run the development server:

```
npm run serve
```

## Built With
*   [ExpressJS](https://expressjs.com/) The REST API Framework
*   [node-influx](https://github.com/node-influx/node-influx) The InfluxDB Client for Node.js
*   [Jest](https://jestjs.io/) The JavaScript Testing Framework
*   [mqtt](https://www.npmjs.com/package/mqtt) The client library for the MQTT protocol for node.js


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
