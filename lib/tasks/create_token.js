"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var prompts = require('prompts');

var _require = require('@helium/crypto'),
    utils = _require.utils;

var generateToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(type, bytes) {
    var buf;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return utils.randomBytes(bytes);

          case 2:
            buf = _context.sent;
            return _context.abrupt("return", [type, buf.toString('base64')].join('_'));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var _require2, Maker, Token, makers, response, maker, publicToken, secretToken, token;

  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _require2 = require('../models'), Maker = _require2.Maker, Token = _require2.Token;
          _context2.next = 3;
          return Maker.findAll();

        case 3:
          makers = _context2.sent;
          _context2.next = 6;
          return prompts({
            type: 'select',
            name: 'makerId',
            message: 'Select a Maker to create an API token for:',
            choices: makers.map(function (maker) {
              return {
                title: maker.name,
                value: maker.id
              };
            })
          });

        case 6:
          response = _context2.sent;

          if (response.makerId) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", process.exit(0));

        case 9:
          _context2.next = 11;
          return Maker.findByPk(response.makerId);

        case 11:
          maker = _context2.sent;
          _context2.next = 14;
          return generateToken('pk', 32);

        case 14:
          publicToken = _context2.sent;
          _context2.next = 17;
          return generateToken('sk', 64);

        case 17:
          secretToken = _context2.sent;
          _context2.next = 20;
          return Token.create({
            publicToken: publicToken,
            secretToken: secretToken,
            makerId: maker.id
          });

        case 20:
          token = _context2.sent;
          console.log('Maker API key successfully created');
          console.log({
            maker: maker.name,
            makerId: maker.id,
            publicToken: token.publicToken,
            secretToken: secretToken
          });
          return _context2.abrupt("return", process.exit(0));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();