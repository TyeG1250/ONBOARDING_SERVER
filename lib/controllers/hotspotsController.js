"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.create = exports.search = exports.show = exports.showLegacy = exports.index = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _snakecaseKeys = _interopRequireDefault(require("snakecase-keys"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _sequelize = require("sequelize");

var _models = require("../models");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var index = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var maker, page, pageSize, hotspots;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            maker = req.maker;
            page = req.query.page ? parseInt(req.query.page) : 0;
            pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 100;
            _context.next = 6;
            return _models.Hotspot.findAll(_objectSpread({
              where: {
                makerId: maker.id
              }
            }, (0, _helpers.paginate)({
              page: page,
              pageSize: pageSize
            })));

          case 6:
            hotspots = _context.sent;
            return _context.abrupt("return", (0, _helpers.successResponse)(req, res, hotspots, 200, {
              page: page,
              pageSize: pageSize
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context.t0.message, 500, _context.t0.errors);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.index = index;

var showLegacy = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var onboardingKey, hotspot, hotspotJSON;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            onboardingKey = req.params.onboardingKey;
            _context2.next = 4;
            return _models.Hotspot.findOne({
              where: {
                onboardingKey: onboardingKey
              },
              include: [{
                model: _models.Maker
              }]
            });

          case 4:
            hotspot = _context2.sent;
            hotspot.Maker.locationNonceLimit = hotspot.Maker.locationNonceLimit + 1;
            hotspotJSON = hotspot.toJSON();
            return _context2.abrupt("return", (0, _helpers.successResponse)(req, res, (0, _snakecaseKeys["default"])(hotspotJSON)));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context2.t0.message, 500, _context2.t0.errors);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function showLegacy(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.showLegacy = showLegacy;

var show = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var maker, onboardingKeyOrId, where, hotspot, hotspotJSON;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            maker = req.maker;
            onboardingKeyOrId = req.params.onboardingKeyOrId;
            where = maker ? (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
              id: onboardingKeyOrId
            }, {
              makerId: maker.id
            }]) : (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
              onboardingKey: onboardingKeyOrId
            }, {
              publicAddress: onboardingKeyOrId
            }]);
            _context3.next = 6;
            return _models.Hotspot.findOne({
              where: where,
              include: [{
                model: _models.Maker
              }]
            });

          case 6:
            hotspot = _context3.sent;

            if (hotspot) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Unable to find hotspot', 404));

          case 9:
            hotspotJSON = hotspot.toJSON();
            return _context3.abrupt("return", (0, _helpers.successResponse)(req, res, (0, _camelcaseKeys["default"])(hotspotJSON)));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context3.t0.message, 500, _context3.t0.errors);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));

  return function show(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.show = show;

var search = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _where, maker, searchQuery, _i, _Object$entries, _Object$entries$_i, key, value, hotspot;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            maker = req.maker;
            searchQuery = [];

            for (_i = 0, _Object$entries = Object.entries(req.query); _i < _Object$entries.length; _i++) {
              _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
              searchQuery.push((0, _defineProperty2["default"])({}, key, value));
            }

            _context4.next = 6;
            return _models.Hotspot.findAll({
              where: (_where = {}, (0, _defineProperty2["default"])(_where, _sequelize.Op.or, searchQuery), (0, _defineProperty2["default"])(_where, _sequelize.Op.and, {
                makerId: maker.id
              }), _where)
            });

          case 6:
            hotspot = _context4.sent;
            return _context4.abrupt("return", (0, _helpers.successResponse)(req, res, hotspot));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context4.t0.message, 500, _context4.t0.errors);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function search(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.search = search;

var create = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var maker, _req$body, onboardingKey, macWlan0, rpiSerial, batch, heliumSerial, macEth0, hotspot;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            maker = req.maker;
            _req$body = req.body, onboardingKey = _req$body.onboardingKey, macWlan0 = _req$body.macWlan0, rpiSerial = _req$body.rpiSerial, batch = _req$body.batch, heliumSerial = _req$body.heliumSerial, macEth0 = _req$body.macEth0;
            _context5.next = 5;
            return _models.Hotspot.create({
              onboardingKey: onboardingKey,
              macWlan0: macWlan0,
              rpiSerial: rpiSerial,
              batch: batch,
              heliumSerial: heliumSerial,
              macEth0: macEth0,
              makerId: maker.id
            });

          case 5:
            hotspot = _context5.sent;
            return _context5.abrupt("return", (0, _helpers.successResponse)(req, res, hotspot, 201));

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context5.t0.message, 500, _context5.t0.errors);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 9]]);
  }));

  return function create(_x9, _x10) {
    return _ref7.apply(this, arguments);
  };
}();

exports.create = create;

var update = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var maker, id, _req$body2, onboardingKey, macWlan0, rpiSerial, batch, heliumSerial, macEth0, hotspot, updatedHotspot;

    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            maker = req.maker;
            id = req.params.id;
            _req$body2 = req.body, onboardingKey = _req$body2.onboardingKey, macWlan0 = _req$body2.macWlan0, rpiSerial = _req$body2.rpiSerial, batch = _req$body2.batch, heliumSerial = _req$body2.heliumSerial, macEth0 = _req$body2.macEth0;
            _context6.next = 6;
            return _models.Hotspot.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                makerId: maker.id
              }])
            });

          case 6:
            hotspot = _context6.sent;

            if (hotspot) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Hotspot not found', 404));

          case 9:
            if (!hotspot.publicAddress) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Hotspot is immutable', 422));

          case 11:
            if (onboardingKey) hotspot.onboardingKey = onboardingKey;
            if (macWlan0) hotspot.macWlan0 = macWlan0;
            if (rpiSerial) hotspot.rpiSerial = rpiSerial;
            if (batch) hotspot.batch = batch;
            if (heliumSerial) hotspot.heliumSerial = heliumSerial;
            if (macEth0) hotspot.macEth0 = macEth0;
            _context6.next = 19;
            return hotspot.save();

          case 19:
            updatedHotspot = _context6.sent;
            return _context6.abrupt("return", (0, _helpers.successResponse)(req, res, updatedHotspot));

          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context6.t0.message, 500, _context6.t0.errors);

          case 26:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 23]]);
  }));

  return function update(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

exports.update = update;

var destroy = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var maker, id, hotspot;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            maker = req.maker;
            id = req.params.id;
            _context7.next = 5;
            return _models.Hotspot.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.and, [{
                id: id
              }, {
                makerId: maker.id
              }])
            });

          case 5:
            hotspot = _context7.sent;

            if (hotspot) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Hotspot not found', 404));

          case 8:
            if (!hotspot.publicAddress) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Hotspot is immutable', 422));

          case 10:
            _context7.next = 12;
            return hotspot.destroy();

          case 12:
            return _context7.abrupt("return", (0, _helpers.successResponse)(req, res, {}, 200));

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context7.t0.message, 500, _context7.t0.errors);

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 15]]);
  }));

  return function destroy(_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();

exports.destroy = destroy;