"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _require = require('sequelize'),
    Model = _require.Model;

var _require2 = require('@fnando/keyring'),
    keyring = _require2.keyring;

var keys = JSON.parse(process.env.KEYRING);
var digestSalt = process.env.KEYRING_SALT;

module.exports = function (sequelize, DataTypes) {
  var Maker = /*#__PURE__*/function (_Model) {
    (0, _inherits2["default"])(Maker, _Model);

    var _super = _createSuper(Maker);

    function Maker() {
      (0, _classCallCheck2["default"])(this, Maker);
      return _super.apply(this, arguments);
    }

    (0, _createClass2["default"])(Maker, null, [{
      key: "associate",
      value: function associate(models) {
        this.hotspots = this.hasMany(models.Hotspot);
        this.tokens = this.hasMany(models.Token);
      }
    }]);
    return Maker;
  }(Model);

  Maker.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    locationNonceLimit: DataTypes.INTEGER,
    encryptedKeypairEntropy: DataTypes.TEXT,
    keypairEntropy: DataTypes.VIRTUAL,
    keyringId: DataTypes.INTEGER
  }, {
    sequelize: sequelize,
    modelName: 'Maker',
    tableName: 'makers',
    underscored: true,
    hooks: {
      beforeCreate: function beforeCreate(record) {
        var encryptor = keyring(keys, {
          digestSalt: digestSalt
        });
        var keypairEntropy = record.keypairEntropy;
        record.keyringId = encryptor.currentId();
        record.encryptedKeypairEntropy = encryptor.encrypt(keypairEntropy);
      },
      afterFind: function afterFind(record) {
        if (!record) return;
        var encryptedKeypairEntropy = record.encryptedKeypairEntropy,
            keyringId = record.keyringId;

        if (encryptedKeypairEntropy) {
          var encryptor = keyring(keys, {
            digestSalt: digestSalt
          });
          record.keypairEntropy = encryptor.decrypt(encryptedKeypairEntropy, keyringId);
        }
      }
    },
    defaultScope: {
      attributes: {
        exclude: ['keypairEntropy', 'encryptedKeypairEntropy', 'keyringId']
      }
    },
    scopes: {
      withKeypair: {
        attributes: {
          include: ['keypairEntropy', 'encryptedKeypairEntropy', 'keyringId']
        }
      }
    }
  });
  return Maker;
};