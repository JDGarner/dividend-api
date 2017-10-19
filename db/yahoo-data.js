const yahooFinance = require("yahoo-finance");
const SP500Tickers = require("../tickers/s&p500").tickers2;

function YahooData() {
	this.stocks = [];

	this.getDividendHistoryForStock = function(ticker) {
		const options = {
			symbol: ticker,
			from: "2010-01-01",
			to: "2017-12-31",
			period: "v"
		};

		return yahooFinance.historical(options).then(entries => {
			const sorted = entries.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			});

			const stock = { ticker };
			stock.dividends = entries.map(entry => {
				return {
					date: entry.date,
					dividend: entry.dividends
				};
			});

			this.stocks.push(stock);
		});
	};

	this.getSP500Data = function() {
		const getAllStocks = SP500Tickers.map(ticker => {
			return this.getDividendHistoryForStock(ticker);
		});

		return Promise.all(getAllStocks)
			.then(() => {
				console.log("Fetched all stocks.");
				return this.stocks;
			})
			.catch(err => console.log(err));
	};
}

module.exports = YahooData;
