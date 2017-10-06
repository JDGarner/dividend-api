const yahooFinance = require("yahoo-finance");
const SP500Tickers = require("./tickers/s&p500").tickers2;

/*
  Stocks
    Ticker       - AAPL|ETC
    Dividends    - Dividend[]
    RegionId     - 1
    CountryId    - 1

  Regions
    Europe|America

  Countries
    UK|Germany

  Dividend
    Ticker
    Date
    Amount

  db.stocks.insert( { ticker: "AAPL", dividends: 15 } )
 
*/

db.stocks.insert({ ticker: "AAPL", dividends: [], region: "", country: "" });

const stocks = [
	{
		ticker: "AAPL",
		dividends: [{ date: "01-01-2017", amount: 0.55 }]
	}
];

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
		entries.map(entry => console.log(entry.dividends));
	});
}

// SP500Tickers.map((ticker) => {
//   getDividendHistoryForStock(ticker);
// });
getDividendHistoryForStock("SWED-A.ST");
