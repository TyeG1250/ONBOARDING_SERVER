"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginate = exports.restrictToMaker = exports.verifyApiKey = exports.validateFields = exports.errorResponse = exports.successResponse = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _models = require("../models");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var successResponse = function successResponse(req, res, data) {
  var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
  var meta = arguments.length > 4 ? arguments[4] : undefined;
  return res.send(_objectSpread({
    code: code,
    data: data,
    success: true
  }, meta !== undefined && {
    meta: meta
  }));
};

exports.successResponse = successResponse;

var errorResponse = function errorResponse(req, res) {
  var errorMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Something went wrong';
  var code = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var errors = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  return res.status(code).json({
    code: code,
    errorMessage: errorMessage,
    errors: errors,
    data: null,
    success: false
  });
};

exports.errorResponse = errorResponse;

var validateFields = function validateFields(object, fields) {
  var errors = [];
  fields.forEach(function (f) {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? "".concat(errors.join(', '), " are required fields.") : '';
};

exports.validateFields = validateFields;

var verifyApiKey = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, _authHeader$split, _authHeader$split2, publicToken, secretToken, token, maker;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authHeader = req.headers['authorization'];

            if (!authHeader) {
              _context.next = 14;
              break;
            }

            _authHeader$split = authHeader.split(':'), _authHeader$split2 = (0, _slicedToArray2["default"])(_authHeader$split, 2), publicToken = _authHeader$split2[0], secretToken = _authHeader$split2[1];

            if (!(publicToken && secretToken)) {
              _context.next = 14;
              break;
            }

            _context.next = 6;
            return _models.Token.findOne({
              where: {
                publicToken: publicToken
              }
            });

          case 6:
            token = _context.sent;

            if (!(token && _bcryptjs["default"].compareSync(secretToken, token.secretToken))) {
              _context.next = 14;
              break;
            }

            _context.next = 10;
            return _models.Maker.findByPk(token.makerId);

          case 10:
            maker = _context.sent;
            token.lastUsedAt = new Date();
            token.save();

            if (maker) {
              req.maker = maker;
            }

          case 14:
            next();

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyApiKey(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyApiKey = verifyApiKey;

var restrictToMaker = function restrictToMaker(req, res, next) {
  if (req.maker) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};

exports.restrictToMaker = restrictToMaker;

var paginate = function paginate(_ref2) {
  var _ref2$page = _ref2.page,
      page = _ref2$page === void 0 ? 0 : _ref2$page,
      _ref2$pageSize = _ref2.pageSize,
      pageSize = _ref2$pageSize === void 0 ? 100 : _ref2$pageSize;
  var offset = page * pageSize;
  var limit = pageSize;
  return {
    offset: offset,
    limit: limit
  };
};

exports.paginate = paginate;