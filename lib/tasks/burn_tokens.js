"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var prompts = require('prompts');

var _require = require('@helium/http'),
    Client = _require.Client,
    Network = _require.Network;

var _require2 = require('@helium/transactions'),
    TokenBurnV1 = _require2.TokenBurnV1,
    Transaction = _require2.Transaction;

var _require3 = require('@helium/crypto'),
    Address = _require3.Address,
    Keypair = _require3.Keypair;

(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var client, vars, _require4, Maker, makers, makerAccounts, _iterator, _step, _maker, account, makerChoice, maker, makerAccount, amountChoice, txn, confirmResponse, makerWithKeypair, keypairEntropy, keypair, signedTxn, pendingTxn;

  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          client = new Client(Network.production);
          _context.next = 3;
          return client.vars.get();

        case 3:
          vars = _context.sent;
          Transaction.config(vars);
          _require4 = require('../models'), Maker = _require4.Maker;
          _context.next = 8;
          return Maker.findAll();

        case 8:
          makers = _context.sent;
          makerAccounts = {};
          _iterator = _createForOfIteratorHelper(makers);
          _context.prev = 11;

          _iterator.s();

        case 13:
          if ((_step = _iterator.n()).done) {
            _context.next = 21;
            break;
          }

          _maker = _step.value;
          _context.next = 17;
          return client.accounts.get(_maker.address);

        case 17:
          account = _context.sent;
          makerAccounts[_maker.id] = account;

        case 19:
          _context.next = 13;
          break;

        case 21:
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](11);

          _iterator.e(_context.t0);

        case 26:
          _context.prev = 26;

          _iterator.f();

          return _context.finish(26);

        case 29:
          _context.next = 31;
          return prompts({
            type: 'select',
            name: 'makerId',
            message: 'Select a Maker with an HNT balance to burn:',
            choices: makers.map(function (maker) {
              return {
                title: "".concat(maker.name, " (").concat(makerAccounts[maker.id].balance.toString(2), ")"),
                value: maker.id,
                disabled: makerAccounts[maker.id].balance.integerBalance === 0
              };
            })
          });

        case 31:
          makerChoice = _context.sent;

          if (makerChoice.makerId) {
            _context.next = 34;
            break;
          }

          return _context.abrupt("return", process.exit(0));

        case 34:
          _context.next = 36;
          return Maker.findByPk(makerChoice.makerId);

        case 36:
          maker = _context.sent;
          makerAccount = makerAccounts[makerChoice.makerId];
          _context.next = 40;
          return prompts({
            type: 'number',
            name: 'amount',
            message: 'How much HNT should be burned?',
            style: 'default',
            "float": true,
            round: 8,
            min: 0.00000001,
            max: makerAccount.balance.floatBalance,
            validate: function validate(v) {
              return v !== '' ? true : 'This field is required';
            }
          });

        case 40:
          amountChoice = _context.sent;
          txn = new TokenBurnV1({
            payer: Address.fromB58(maker.address),
            payee: Address.fromB58(maker.address),
            amount: amountChoice.amount * 100000000,
            nonce: makerAccount.speculativeNonce + 1,
            memo: ""
          });
          console.log('Payer', txn.payer.b58);
          console.log('Payee', txn.payee.b58);
          console.log('Amount (in Bones)', txn.amount);
          console.log('Fee (in DC)', txn.fee);
          console.log('Nonce', txn.nonce);
          console.log('Memo', txn.memo);
          _context.next = 50;
          return prompts({
            type: 'text',
            name: 'understand',
            message: "Danger! Confirm transaction details above. This will sign and submit a DC Burn transaction. If you know what you are doing, type 'I UNDERSTAND'",
            validate: function validate(v) {
              return v === "I UNDERSTAND" ? true : 'This field is required';
            }
          });

        case 50:
          confirmResponse = _context.sent;

          if (!(confirmResponse.understand !== 'I UNDERSTAND')) {
            _context.next = 53;
            break;
          }

          return _context.abrupt("return", process.exit(0));

        case 53:
          _context.next = 55;
          return Maker.scope('withKeypair').findByPk(makerChoice.makerId);

        case 55:
          makerWithKeypair = _context.sent;
          keypairEntropy = Buffer.from(makerWithKeypair.keypairEntropy, 'hex');
          _context.next = 59;
          return Keypair.fromEntropy(keypairEntropy);

        case 59:
          keypair = _context.sent;
          _context.next = 62;
          return txn.sign({
            payer: keypair
          });

        case 62:
          signedTxn = _context.sent;
          _context.next = 65;
          return client.transactions.submit(signedTxn.toString());

        case 65:
          pendingTxn = _context.sent;
          console.log(pendingTxn);
          return _context.abrupt("return", process.exit(0));

        case 68:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[11, 23, 26, 29]]);
}))();