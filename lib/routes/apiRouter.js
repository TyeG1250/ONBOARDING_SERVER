"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _rateLimitRedis = _interopRequireDefault(require("rate-limit-redis"));

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cors = _interopRequireDefault(require("cors"));

var transactionsController = _interopRequireWildcard(require("../controllers/transactionsController"));

var makersController = _interopRequireWildcard(require("../controllers/makersController"));

var hotspotsController = _interopRequireWildcard(require("../controllers/hotspotsController"));

var _helpers = require("../helpers");

var REQUIRED_FIRMWARE_VERSION = '2019.11.06.0';

var router = _express["default"].Router();

router.use((0, _cors["default"])());
router.options('*', (0, _cors["default"])());

var numberEnv = function numberEnv(envName, fallback) {
  if (process.env[envName]) {
    return parseInt(process.env[envName]);
  }

  return fallback;
};

var redisClient;

if (process.env.REDIS_URL) {
  redisClient = new _ioredis["default"](process.env.REDIS_URL);
}

var strictLimitOpts = {
  windowMs: 10 * 60 * 1000,
  max: 10,
  skip: function skip(req, res) {
    return req.maker;
  }
};

if (process.env.REDIS_URL) {
  strictLimitOpts.store = new _rateLimitRedis["default"]({
    client: redisClient
  });
}

var strictLimit = (0, _expressRateLimit["default"])(strictLimitOpts);
var defaultLimitOpts = {
  windowMs: numberEnv('RATE_LIMIT_WINDOW', 15 * 60 * 1000),
  // 15 minutes
  max: numberEnv('RATE_LIMIT_MAX', 3),
  skip: function skip(req, res) {
    return req.maker;
  }
};

if (process.env.REDIS_URL) {
  defaultLimitOpts.store = new _rateLimitRedis["default"]({
    client: redisClient
  });
}

var defaultLimit = (0, _expressRateLimit["default"])(defaultLimitOpts);
router.use(_helpers.verifyApiKey);
router.use(defaultLimit); // Legacy CLI Support (2020)

router.post('/v1/transactions/pay/:onboardingKey', strictLimit, transactionsController.pay);
router.get('/v1/address', makersController.legacyAddress);
router.get('/v1/limits', function (req, res) {
  return (0, _helpers.successResponse)(req, res, {
    location_nonce: 3
  });
}); // V2 (Q1 2021)
// Restricted Maker API

router.get('/v2/hotspots', _helpers.restrictToMaker, hotspotsController.index);
router.get('/v2/hotspots/search', _helpers.restrictToMaker, hotspotsController.search);
router.post('/v2/hotspots', _helpers.restrictToMaker, hotspotsController.create);
router.put('/v2/hotspots/:id', _helpers.restrictToMaker, hotspotsController.update);
router["delete"]('/v2/hotspots/:id', _helpers.restrictToMaker, hotspotsController.destroy); // Public rate limited API

router.get('/v2/hotspots/:onboardingKeyOrId', strictLimit, hotspotsController.show);
router.post('/v2/transactions/pay/:onboardingKey', strictLimit, transactionsController.pay);
router.get('/v2/transactions/sample', transactionsController.sample);
router.get('/v2/makers', makersController.index);
router.get('/v2/makers/:makerId', makersController.show);
router.get('/v2/firmware', function (req, res) {
  return (0, _helpers.successResponse)(req, res, {
    version: REQUIRED_FIRMWARE_VERSION
  });
});
module.exports = router;