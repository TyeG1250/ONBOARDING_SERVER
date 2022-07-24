"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var prompts = require('prompts');

var _require = require('@helium/crypto'),
    Keypair = _require.Keypair,
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
  var _require2, Maker, Token, response, keypairEntropy, keypair, address, maker, publicToken, secretToken, token;

  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _require2 = require('../models'), Maker = _require2.Maker, Token = _require2.Token;
          _context2.next = 3;
          return prompts([{
            type: 'text',
            name: 'name',
            message: "What is the Maker's name?",
            validate: function validate(name) {
              return name.length > 0 ? true : 'This field is required';
            }
          }, {
            type: 'number',
            name: 'locationNonceLimit',
            message: 'How many assert location transactions should be paid for?',
            style: 'default',
            min: 0,
            max: 10,
            validate: function validate(v) {
              return v !== '' ? true : 'This field is required';
            }
          }, {
            type: 'text',
            name: 'keypairEntropy',
            message: '(optional) What is the wallet entropy?'
          }, {
            type: 'confirm',
            name: 'apiKey',
            message: 'Do you want to create an API key for this Maker?'
          }]);

        case 3:
          response = _context2.sent;

          if (!(!response.name || !response.locationNonceLimit)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", process.exit(0));

        case 6:
          if (!response.keypairEntropy) {
            _context2.next = 10;
            break;
          }

          keypairEntropy = Buffer.from(response.keypairEntropy, 'hex');
          _context2.next = 13;
          break;

        case 10:
          _context2.next = 12;
          return utils.randomBytes(32);

        case 12:
          keypairEntropy = _context2.sent;

        case 13:
          _context2.next = 15;
          return Keypair.fromEntropy(keypairEntropy);

        case 15:
          keypair = _context2.sent;
          address = keypair.address.b58;
          _context2.next = 19;
          return Maker.create({
            name: response.name,
            address: address,
            keypairEntropy: keypairEntropy.toString('hex'),
            locationNonceLimit: response.locationNonceLimit
          });

        case 19:
          maker = _context2.sent;
          console.log('Maker successfully created');
          console.log({
            id: maker.id,
            name: maker.name,
            address: maker.address,
            locationNonceLimit: maker.locationNonceLimit
          });

          if (!(response.apiKey === false)) {
            _context2.next = 24;
            break;
          }

          return _context2.abrupt("return", process.exit(0));

        case 24:
          _context2.next = 26;
          return generateToken('pk', 32);

        case 26:
          publicToken = _context2.sent;
          _context2.next = 29;
          return generateToken('sk', 64);

        case 29:
          secretToken = _context2.sent;
          _context2.next = 32;
          return Token.create({
            publicToken: publicToken,
            secretToken: secretToken,
            makerId: maker.id
          });

        case 32:
          token = _context2.sent;
          console.log('Maker API key successfully created');
          console.log({
            maker: maker.name,
            makerId: maker.id,
            publicToken: token.publicToken,
            secretToken: secretToken
          });
          return _context2.abrupt("return", process.exit(0));

        case 36:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();