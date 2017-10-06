//server.js
var graphql = require("graphql").graphql;
var express = require("express");
var expressGraphQL = require("express-graphql");
var schema = require("./schema");

// This is just an internal test
var query = "query { stocks { id, ticker, country } }";
graphql(schema, query).then(function(result) {
	console.log(JSON.stringify(result, null, " "));
});

var app = express();

app.use(
	"/graphql",
	expressGraphQL(req => ({
		schema,
		graphiql: true,
		pretty: true
	}))
);

app.listen(8080, function(err) {
	console.log("GraphQL Server is now running on localhost:8080");
});
