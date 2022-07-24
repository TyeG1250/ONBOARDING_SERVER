"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.legacyLimits = exports.legacyAddress = exports.show = exports.index = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var _helpers = require("../helpers");

var index = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var makers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.Maker.findAll();

          case 3:
            makers = _context.sent;
            return _context.abrupt("return", (0, _helpers.successResponse)(req, res, makers));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context.t0.message, 500, _context.t0.errors);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.index = index;

var show = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var makerId, maker;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            makerId = req.params.makerId;
            _context2.next = 4;
            return _models.Maker.findByPk(makerId);

          case 4:
            maker = _context2.sent;
            return _context2.abrupt("return", (0, _helpers.successResponse)(req, res, maker));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context2.t0.message, 500, _context2.t0.errors);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function show(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.show = show;

var legacyAddress = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var maker;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.Maker.findByPk(1);

          case 3:
            maker = _context3.sent;
            return _context3.abrupt("return", (0, _helpers.successResponse)(req, res, {
              address: maker.address
            }));

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context3.t0.message, 500, _context3.t0.errors);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function legacyAddress(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.legacyAddress = legacyAddress;

var legacyLimits = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var maker;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models.Maker.findByPk(1);

          case 3:
            maker = _context4.sent;
            return _context4.abrupt("return", res.json({
              location_nonce: maker.locationNonceLimit + 1
            }));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            (0, _helpers.errorResponse)(req, res, _context4.t0.message, 500, _context4.t0.errors);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function legacyLimits(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.legacyLimits = legacyLimits;