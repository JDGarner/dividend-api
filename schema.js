var {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = require("graphql");

var STOCK_DATA = [
	{
		id: 1446412739542,
		ticker: "AAPL",
		country: "USA"
	},
	{
		id: 1446412740883,
		ticker: "NG.",
		country: "UK"
	}
];

var StockType = new GraphQLObjectType({
	name: "stock",
	fields: () => ({
		id: {
			type: GraphQLID
		},
		ticker: {
			type: GraphQLString
		},
		country: {
			type: GraphQLString
		}
	})
});

var QueryType = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		stocks: {
			type: new GraphQLList(StockType),
			resolve: function() {
				return STOCK_DATA;
			}
		}
	})
});

var MutationType = new GraphQLObjectType({
	name: "AddStock",
	fields: () => ({
		add: {
			type: StockType,
			description: "Add a stock",
			args: {
				ticker: {
					name: "Ticker",
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: (root, args) => {
				return {
					ticker: args.ticker,
					counter: "USA"
				};
			}
		}
	})
});

module.exports = new GraphQLSchema({
	query: QueryType,
	mutation: MutationType
});

/*
    curl -XPOST -H "Content-Type:application/graphql" -d 'query { stocks { ticker country } }' http://localhost:8080
    curl -XPOST -H "Content-Type:application/graphql" -d 'mutation AddStock { add(ticker: "TEST") { ticker country } } }' http://localhost:8080
    */
