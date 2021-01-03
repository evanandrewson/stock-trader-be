const { Router } = require('express');
const Portfolio = require('../models/Portfolio');

module.exports = Router()
  .get('/', (req, res, next) => {
    Portfolio
      .findOne({ user: req.user._id})
      .then(portfolio => {
        res.send(portfolio);
      })
      .catch(next);
  })
  .put('/', (req, res, next) => {
    Portfolio
      .findOneAndUpdate({ user: req.user._id}, { ...req.body }, { new: true })
      .then(portfolio => {
        res.send(portfolio);
      })
      .catch(next);
  })