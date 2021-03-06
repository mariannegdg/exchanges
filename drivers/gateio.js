const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const tickers = await request('https://data.gateio.co/api2/1/tickers');
  const pairs = Object.keys(tickers);

  return pairs.map((pair) => {
    const [base, quote] = pair.split('_');
    const ticker = tickers[pair];

    // Yes, quoteVolume and baseVolume are switched :)
    return new Ticker({
      base,
      quote,
      quoteVolume: parseToFloat(ticker.baseVolume),
      baseVolume: parseToFloat(ticker.quoteVolume),
      close: parseToFloat(ticker.last),
      high: parseToFloat(ticker.high24hr),
      low: parseToFloat(ticker.low24hr),
    });
  });
};
