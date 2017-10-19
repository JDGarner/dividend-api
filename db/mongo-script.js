const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const ObjectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/finance";
const YahooData = require("./yahoo-data");

const yahooData = new YahooData();

yahooData.getSP500Data().then(stocks => {
	MongoClient.connect(url, (err, db) => {
		assert.equal(null, err);
		insertStocks(stocks, db, () => {
			console.log("Finished adding, closing db");
			db.close();
		});
	});
});

function insertStocks(stocks, db, callback) {
	db.collection("stocks").insert(stocks, (err, result) => {
		assert.equal(err, null);
		callback();
	});
}
