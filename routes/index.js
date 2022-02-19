const express = require("express");
const router = express.Router();
const axios = require("axios");
const crtl = require("../controller/cryptoController");

router.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.send({
      message:
        error.message || "some error occured when trying to load this page!!!",
    });
  }
});

router.get("/crypto", async (req, res) => {
  const btc = await axios.get(`http://rest.coinapi.io/v1/assets/BTC?apikey=F644AC31-6327-4873-8F28-F6BB777843B8`)
  const usdt = await axios.get(`http://rest.coinapi.io/v1/assets/USDT?apikey=F644AC31-6327-4873-8F28-F6BB777843B8`)
  const eur = await axios.get(`http://rest.coinapi.io/v1/assets/EUR?apikey=F644AC31-6327-4873-8F28-F6BB777843B8`)
  const btcCurrentPrice = btc.data[0].price_usd
  const eurCurrentPrice = eur.data[0].price_usd
  const usdtCurrentPrice = usdt.data[0].price_usd
  try {
    const response = await crtl.getters.getCrypto();
    const dataUser = [];
    response.map((el) => {
      var balance = eval(el.balances)
      balance.map((i) => {
        if (i.asset === 'BTC') {
          i['btcValue'] = btcCurrentPrice
        } else if (i.asset === 'EUR') {
          i['btcValue'] = eurCurrentPrice
        } else if (i.asset === 'USDT') {
          i['btcValue'] = usdtCurrentPrice
        }
      })

      dataUser.push({ id: el.id, user: el.name, balances: balance });
    });

    res.json({ dataUser, usdtCurrentPrice, eurCurrentPrice, btcCurrentPrice });
  } catch (error) {
    res.send({
      message:
        error.message || "an error occured while trying to retrieve data",
    });
  }
});



module.exports = { indexRouter: router };
