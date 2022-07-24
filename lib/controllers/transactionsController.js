"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sample = exports.pay = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _crypto = require("@helium/crypto");

var _transactions = require("@helium/transactions");

var _models = require("../models");

var _helpers = require("../helpers");

var _sequelize = require("sequelize");

var env = process.env.NODE_ENV || 'development';

var pay = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _txn, _txn$payer, _txn2, _txn2$gateway, _txn3, _txn3$gateway, _txn4, _txn4$gateway, onboardingKey, transaction, hotspot, maker, keypairEntropy, keypair, txn, signedTxn;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            onboardingKey = req.params.onboardingKey;
            transaction = req.body.transaction;

            if (transaction) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Missing transaction param', 422));

          case 5:
            _context.next = 7;
            return _models.Hotspot.findOne({
              where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
                onboardingKey: onboardingKey
              }, {
                publicAddress: onboardingKey
              }])
            });

          case 7:
            hotspot = _context.sent;

            if (hotspot) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Hotspot not found', 404));

          case 10:
            _context.next = 12;
            return _models.Maker.scope('withKeypair').findByPk(hotspot.makerId);

          case 12:
            maker = _context.sent;
            keypairEntropy = Buffer.from(maker.keypairEntropy, 'hex');
            _context.next = 16;
            return _crypto.Keypair.fromEntropy(keypairEntropy);

          case 16:
            keypair = _context.sent;
            _context.t0 = _transactions.Transaction.stringType(transaction);
            _context.next = _context.t0 === 'addGateway' ? 20 : _context.t0 === 'assertLocation' ? 22 : _context.t0 === 'assertLocationV2' ? 26 : 30;
            break;

          case 20:
            txn = _transactions.AddGatewayV1.fromString(transaction);
            return _context.abrupt("break", 31);

          case 22:
            txn = _transactions.AssertLocationV1.fromString(transaction); // transactions are only signed up until the maker's nonce limit

            if (!(txn.nonce > maker.locationNonceLimit)) {
              _context.next = 25;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Nonce limit exceeded', 422));

          case 25:
            return _context.abrupt("break", 31);

          case 26:
            txn = _transactions.AssertLocationV2.fromString(transaction); // transactions are only signed up until the maker's nonce limit

            if (!(txn.nonce > maker.locationNonceLimit)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Nonce limit exceeded', 422));

          case 29:
            return _context.abrupt("break", 31);

          case 30:
            throw new Error('Unsupported transaction type');

          case 31:
            if (!(((_txn = txn) === null || _txn === void 0 ? void 0 : (_txn$payer = _txn.payer) === null || _txn$payer === void 0 ? void 0 : _txn$payer.b58) !== maker.address)) {
              _context.next = 33;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Invalid payer address', 422));

          case 33:
            if (!(hotspot.id > 32951 && ((_txn2 = txn) === null || _txn2 === void 0 ? void 0 : (_txn2$gateway = _txn2.gateway) === null || _txn2$gateway === void 0 ? void 0 : _txn2$gateway.b58) !== onboardingKey)) {
              _context.next = 35;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Invalid hotspot address', 422));

          case 35:
            if (!(hotspot.publicAddress && hotspot.publicAddress !== ((_txn3 = txn) === null || _txn3 === void 0 ? void 0 : (_txn3$gateway = _txn3.gateway) === null || _txn3$gateway === void 0 ? void 0 : _txn3$gateway.b58))) {
              _context.next = 37;
              break;
            }

            return _context.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Onboarding key already used', 422));

          case 37:
            hotspot.publicAddress = (_txn4 = txn) === null || _txn4 === void 0 ? void 0 : (_txn4$gateway = _txn4.gateway) === null || _txn4$gateway === void 0 ? void 0 : _txn4$gateway.b58;
            _context.next = 40;
            return hotspot.save();

          case 40:
            _context.next = 42;
            return txn.sign({
              payer: keypair
            });

          case 42:
            signedTxn = _context.sent;
            return _context.abrupt("return", (0, _helpers.successResponse)(req, res, {
              transaction: signedTxn.toString()
            }));

          case 46:
            _context.prev = 46;
            _context.t1 = _context["catch"](0);
            (0, _helpers.errorResponse)(req, res, env === 'development' ? _context.t1.message : 'Internal error', 500, env === 'development' ? _context.t1.errors : []);

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 46]]);
  }));

  return function pay(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.pay = pay;

var sample = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var maker, keypairEntropy, keypair, owner, gateway, txn, signedTxn1, signedTxn2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(env === 'production')) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", (0, _helpers.errorResponse)(req, res, 'Not available', 422));

          case 2:
            _context2.next = 4;
            return _models.Maker.scope('withKeypair').findByPk(1);

          case 4:
            maker = _context2.sent;
            keypairEntropy = Buffer.from(maker.keypairEntropy, 'hex');
            _context2.next = 8;
            return _crypto.Keypair.fromEntropy(keypairEntropy);

          case 8:
            keypair = _context2.sent;
            _context2.next = 11;
            return _crypto.Keypair.makeRandom();

          case 11:
            owner = _context2.sent;
            _context2.next = 14;
            return _crypto.Keypair.makeRandom();

          case 14:
            gateway = _context2.sent;
            txn = new _transactions.AddGatewayV1({
              owner: owner.address,
              gateway: gateway.address,
              payer: keypair.address,
              stakingFee: 40000
            });
            _context2.next = 18;
            return txn.sign({
              owner: owner
            });

          case 18:
            signedTxn1 = _context2.sent;
            _context2.next = 21;
            return signedTxn1.sign({
              gateway: gateway
            });

          case 21:
            signedTxn2 = _context2.sent;
            return _context2.abrupt("return", (0, _helpers.successResponse)(req, res, {
              txn: signedTxn2.toString()
            }));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function sample(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.sample = sample;