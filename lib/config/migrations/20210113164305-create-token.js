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
              return queryInterface.createTable('tokens', {
                id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
                },
                public_token: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                secret_token: {
                  allowNull: false,
                  type: Sequelize.STRING
                },
                maker_id: {
                  allowNull: false,
                  type: Sequelize.INTEGER,
                  references: {
                    model: {
                      tableName: 'makers'
                    },
                    key: 'id'
                  }
                },
                last_used_at: {
                  type: Sequelize.DATE
                },
                created_at: {
                  allowNull: false,
                  type: Sequelize.DATE
                },
                updated_at: {
                  allowNull: false,
                  type: Sequelize.DATE
                }
              }, {
                transaction: transaction
              });

            case 6:
              _context.next = 8;
              return queryInterface.addIndex('tokens', ['public_token'], {
                unique: true,
                transaction: transaction
              });

            case 8:
              _context.next = 10;
              return queryInterface.addIndex('tokens', ['secret_token'], {
                unique: true,
                transaction: transaction
              });

            case 10:
              _context.next = 12;
              return transaction.commit();

            case 12:
              _context.next = 19;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              _context.next = 18;
              return transaction.rollback();

            case 18:
              throw _context.t0;

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 14]]);
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
              return queryInterface.dropTable('tokens', {
                transaction: transaction
              });

            case 6:
              _context2.next = 8;
              return queryInterface.removeIndex('tokens', 'tokens_public_token', {
                transaction: transaction
              });

            case 8:
              _context2.next = 10;
              return queryInterface.removeIndex('tokens', 'tokens_secret_token', {
                transaction: transaction
              });

            case 10:
              _context2.next = 12;
              return transaction.commit();

            case 12:
              _context2.next = 19;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](3);
              _context2.next = 18;
              return transaction.rollback();

            case 18:
              throw _context2.t0;

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 14]]);
    }));

    function down(_x3, _x4) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};