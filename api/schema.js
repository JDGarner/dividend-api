const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLFloat,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull
} = require("graphql");

const STOCK_DATA = [
	{
		_id: 1446412739542,
		ticker: "AAPL",
		dividends: [
			{
				date: "2010-01-13 05:00:00.000Z",
				dividend: 0.15097
			},
			{
				date: "2011-01-13 08:00:00.000Z",
				dividend: 0.25097
			}
		]
	},
	{
		_id: 1446412740883,
		ticker: "BABA",
		dividends: [
			{
				date: "2012-03-13 05:00:00.000Z",
				dividend: 0.15097
			},
			{
				date: "2013-04-13 06:00:00.000Z",
				dividend: 0.25097
			}
		]
	}
];

const DividendType = new GraphQLObjectType({
	name: "dividend",
	fields: () => ({
		date: {
			type: GraphQLString
		},
		dividend: {
			type: GraphQLFloat
		}
	})
})

const StockType = new GraphQLObjectType({
	name: "stock",
	fields: () => ({
		_id: {
			type: GraphQLID
		},
		ticker: {
			type: GraphQLString
		},
		dividends: {
			type: new GraphQLList(DividendType)
		}
	})
});

const QueryType = new GraphQLObjectType({
	name: "root",
	fields: () => ({
		stocks: {
			type: new GraphQLList(StockType),
			resolve: () => {
				return STOCK_DATA;
			}
		},
		dividends: {
			type: new GraphQLList(DividendType),
			args: {
				ticker: { type: GraphQLString }
			},
			resolve: (root, { ticker }) => {
				return STOCK_DATA.find(stock => stock.ticker === ticker).dividends;
			}
		}
	})
});

const MutationType = new GraphQLObjectType({
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
					id: 4,
					ticker: args.ticker,
					country: "USA"
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
    curl -XPOST -H "Content-Type:application/graphql" -d 'query { stocks { _id ticker dividends { date dividend } } }' http://localhost:8080/graphql
    curl -XPOST -H "Content-Type:application/graphql" -d 'mutation AddStock { add(ticker: "TEST") { ticker country } } }' http://localhost:8080
*/
