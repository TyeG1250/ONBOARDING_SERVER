'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var transaction;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.sequelize.transaction();

            case 2:
              transaction = _context.sent;
              _context.prev = 3;
              _context.next = 6;
              return queryInterface.addIndex('hotspots', ['onboarding_key'], {
                unique: true,
                transaction: transaction
              });

            case 6:
              _context.next = 8;
              return queryInterface.addIndex('hotspots', ['public_address'], {
                unique: true,
                transaction: transaction
              });

            case 8:
              _context.next = 10;
              return queryInterface.addIndex('hotspots', ['mac_wlan0'], {
                unique: true,
                transaction: transaction
              });

            case 10:
              _context.next = 12;
              return queryInterface.addIndex('hotspots', ['mac_eth0'], {
                unique: true,
                transaction: transaction
              });

            case 12:
              _context.next = 14;
              return queryInterface.addIndex('hotspots', ['helium_serial'], {
                unique: true,
                transaction: transaction
              });

            case 14:
              _context.next = 16;
              return queryInterface.addIndex('hotspots', ['rpi_serial'], {
                unique: true,
                transaction: transaction
              });

            case 16:
              _context.next = 18;
              return transaction.commit();

            case 18:
              _context.next = 25;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](3);
              _context.next = 24;
              return transaction.rollback();

            case 24:
              throw _context.t0;

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 20]]);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryInterface, Sequelize) {
      var transaction;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return queryInterface.sequelize.transaction();

            case 2:
              transaction = _context2.sent;
              _context2.prev = 3;
              _context2.next = 6;
              return queryInterface.removeIndex('hotspots', 'hotspots_onboarding_key', {
                transaction: transaction
              });

            case 6:
              _context2.next = 8;
              return queryInterface.removeIndex('hotspots', 'hotspots_public_address', {
                transaction: transaction
              });

            case 8:
              _context2.next = 10;
              return queryInterface.removeIndex('hotspots', 'hotspots_mac_wlan0', {
                transaction: transaction
              });

            case 10:
              _context2.next = 12;
              return queryInterface.removeIndex('hotspots', 'hotspots_mac_eth0', {
                transaction: transaction
              });

            case 12:
              _context2.next = 14;
              return queryInterface.removeIndex('hotspots', 'hotspots_helium_serial', {
                transaction: transaction
              });

            case 14:
              _context2.next = 16;
              return queryInterface.removeIndex('hotspots', 'hotspots_rpi_serial', {
                transaction: transaction
              });

            case 16:
              _context2.next = 18;
              return transaction.commit();

            case 18:
              _context2.next = 25;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](3);
              _context2.next = 24;
              return transaction.rollback();

            case 24:
              throw _context2.t0;

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 20]]);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};