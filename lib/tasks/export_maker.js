"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var prompts = require('prompts');

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var _require, Maker, makers, response, confirmResponse, maker, keypairEntropy;

  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _require = require('../models'), Maker = _require.Maker;
          _context.next = 3;
          return Maker.findAll();

        case 3:
          makers = _context.sent;
          _context.next = 6;
          return prompts({
            type: 'select',
            name: 'makerId',
            message: 'Select a Maker to export:',
            choices: makers.map(function (maker) {
              return {
                title: maker.name,
                value: maker.id
              };
            })
          });

        case 6:
          response = _context.sent;

          if (response.makerId) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", process.exit(0));

        case 9:
          _context.next = 11;
          return prompts({
            type: 'text',
            name: 'understand',
            message: "Danger! The selected Maker's **UNENCRYPTED** wallet entropy seed will now be displayed. This provides full access to the Maker wallet including its DC, HNT and onboarding rights. If you know what you are doing, type 'I UNDERSTAND'",
            validate: function validate(v) {
              return v === "I UNDERSTAND" ? true : 'This field is required';
            }
          });

        case 11:
          confirmResponse = _context.sent;

          if (!(confirmResponse.understand !== 'I UNDERSTAND')) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", process.exit(0));

        case 14:
          _context.next = 16;
          return Maker.scope('withKeypair').findByPk(response.makerId);

        case 16:
          maker = _context.sent;
          keypairEntropy = maker.keypairEntropy;
          console.log('Maker details:');
          console.log({
            id: maker.id,
            name: maker.name,
            address: maker.address,
            locationNonceLimit: maker.locationNonceLimit
          });
          console.log('Maker wallet entropy:');
          console.log(keypairEntropy);
          return _context.abrupt("return", process.exit(0));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();