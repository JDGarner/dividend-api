const yahooFinance = require("yahoo-finance");
const SP500Tickers = require("./tickers/s&p500").tickers2;

function getDividendHistoryForStock(ticker) {
  const options = {
    symbol: ticker,
    from: "2010-01-01",
    to: "2017-12-31",
    period: "v"
  };

  yahooFinance.historical(options).then((entries) => {
    const sorted = entries.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    entries.map(entry => console.log(entry.dividends));
  })
}

SP500Tickers.map((ticker) => {
  getDividendHistoryForStock(ticker);
});
// const dividends = getDividendHistoryForStock("SWED-A.ST");
