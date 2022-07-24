"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _express = _interopRequireDefault(require("express"));

var _expressBasicAuth = _interopRequireDefault(require("express-basic-auth"));

var transactionsController = _interopRequireWildcard(require("../controllers/transactionsController"));

var makersController = _interopRequireWildcard(require("../controllers/makersController"));

var hotspotsController = _interopRequireWildcard(require("../controllers/hotspotsController"));

var _helpers = require("../helpers");

var router = _express["default"].Router();

var username = process.env.APP_USERNAME;
var password = process.env.APP_PASSWORD;
router.use((0, _expressBasicAuth["default"])({
  users: (0, _defineProperty2["default"])({}, username, password)
}));
var REQUIRED_FIRMWARE_VERSION = '2019.11.06.0'; // Legacy Support (2020)

router.get('/hotspots/:onboardingKey', hotspotsController.showLegacy);
router.post('/transactions/pay/:onboardingKey', transactionsController.pay);
router.get('/address', makersController.legacyAddress);
router.get('/limits', makersController.legacyLimits);
router.get('/firmware', function (req, res) {
  return (0, _helpers.successResponse)(req, res, {
    version: REQUIRED_FIRMWARE_VERSION
  });
});
module.exports = router;