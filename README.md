# Project Overview

This project is a Node.js server that serves different HTML pages and images. The server is built using core Node.js modules such as fs, fsPromises, path, eventemitter, and http. In addition, it also utilizes third-party packages such as date-fns and uuid for various functionalities. The server is designed to handle different types of requests and responses, providing an excellent opportunity to understand how a server works, how to handle different requests, and improve your understanding of Node.js, npm, and JavaScript core concepts.

## Installation

To use this server, you need to have Node.js and npm installed on your computer. Once you have installed these prerequisites, follow the below steps to install and run the server:

Clone this repository using git clone [https://github.com/iamdylanmj/.git].
Navigate to the project's directory using the command cd simpleNodejsServer.
Run npm install to install all dependencies.
Run npm start to start the server. The server will be running on port 3000 by default.
Server Features
This server has several features that make it an excellent learning tool for Node.js beginners. Some of the features are:

## Routing

The server can handle different types of requests, including GET, POST, PUT, and DELETE requests. It uses routing to direct requests to the appropriate endpoints. The server's routing functionality is implemented using the http module's createServer() method.

## Serving Static Files

The server can serve static files such as HTML pages and images. It uses the fs and fsPromises modules to read and write files.

## Error Handling

The server can handle errors gracefully. It uses try-catch blocks to catch errors and provides informative error messages to the client.

## Event Emitter

The server uses the eventemitter module to emit events such as "server listening" and "client request."

## npm Packages

The server uses third-party npm packages such as date-fns and uuid to implement various functionalities.

## Nodemon

The server uses nodemon as a development tool to monitor file changes and automatically restart the server.

## Conclusion

This Node.js server project is an excellent learning tool for beginners who want to understand how a server works, how to handle different requests and responses, and improve their understanding of Node.js, npm, and JavaScript core concepts. The project uses various core Node.js modules and third-party npm packages, making it an excellent example of how to use these tools to build a functional server.
