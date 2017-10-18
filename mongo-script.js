var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectId = require("mongodb").ObjectID;
var url = "mongodb://localhost:27017/finance";

function insertDocument(stock, db, callback) {
	db.collection("stocks").insertOne(stock,
	function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the stocks collection.");
		callback();
	});
};

function addToDB(stock) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		insertDocument(stock, db, function() {
			db.close();
		});
	});
}

const yahooFinance = require("yahoo-finance");
const SP500Tickers = require("./tickers/s&p500").tickers2;

function getDividendHistoryForStock(ticker) {
	const options = {
		symbol: ticker,
		from: "2010-01-01",
		to: "2017-12-31",
		period: "v"
	};

	yahooFinance.historical(options).then(entries => {
		const sorted = entries.sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});
		const stock = {
			ticker
		}

		stock.dividends = entries.map(entry => {
			return {
				date: entry.date,
				dividend: entry.dividends
			}
			// console.log(entry);
		});

		addToDB(stock);
	});
}

// SP500Tickers.map((ticker) => {
//   getDividendHistoryForStock(ticker);
// });
getDividendHistoryForStock("AAPL");
