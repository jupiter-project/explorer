var _req = require('request');

var request;

try  {
    request = require('browser-request');
} catch (e) {
    request = _req;
}

var Promise = require('bluebird');
var JRS;
  (function (JRS) {
    'use strict';

    JRS.ErrorCodes = {
      1: 'Incorrect request',
      2: 'Blockchain not up to date',
      3: 'Parameter not specified',
      4: 'Incorrect parameter',
      5: 'Unknown object (block, transaction, etc.)',
      6: 'Not enough funds',
      7: 'Not allowed',
      255: 'Internal error'
    };

    // Specific responses
    var extend = function (dest, src) {
        for (var i in src) {
            /*istanbul ignore else*/
            if (Object.prototype.hasOwnProperty.call(src, i)) {
                dest[i] = src[i];
            }
        }

        return dest;
    };

    var API = (function () {
        function API(endpoint) {
            this.config = {};
            this.request = request;
            if (!endpoint) {
                throw new Error('Endpoint must be provided');
            }

            if (endpoint.indexOf('http') !== 0) {
                throw new Error('Endpoint must be set with protocol, either https:// or http://');
            }

            if (endpoint.indexOf('/nxt') === -1) {
                endpoint = endpoint + '/nxt';
            }

            this.config.url = endpoint;
            this.config.json = true;
        }
        API.prototype._clean = function (obj) {
            Object.getOwnPropertyNames(obj).forEach(function (name) {
                if (typeof obj[name] === 'undefined' || obj[name] === null) {
                    delete obj[name];
                }
            });
        };

        API.prototype._call = function (name, qs, callback) {
            var _this = this;
            var req = {};

            if (!name) {
                throw new TypeError('Must provide a name for _call');
            }

            extend(req, this.config);

            if (typeof qs === 'object') {
                extend(qs, {
                    'requestType': name
                });
            } else {
                qs = {
                    'requestType': name
                };
            }

            req['qs'] = qs;

            this._clean(qs);

            return new Promise(function (resolve, reject) {
                _this.request.post(req, function (err, response, body) {
                    if (err) {
                        reject({ errorCode: 255, errorDescription: String(err['message'] ? err['message'] : err) });
                    } else {
                        if (typeof body === 'object') {
                            if (body.errorCode) {
                                reject(body);
                            } else {
                                resolve(body);
                            }
                        } else {
                            reject({ errorCode: 1, errorDescription: Nxt.ErrorCodes[1] });
                        }
                    }
                });
            }).nodeify(callback);
        };

        API.prototype.getNextBlockGenerators = function (req, callback) {
            return this._call('getNextBlockGenerators', req, callback);
        };

        API.prototype.getBlock = function (req, callback) {
            return this._call('getBlock', req, callback);
        };

        API.prototype.getBlockSync = function (req, callback) {
            return this._call('getBlock&height=', req, callback);
        };

        API.prototype.getTransaction = function (req, callback) {
            return this._call('getTransaction', req, callback);
        };

        API.prototype.getAccountTransactions = function (req, callback) {
            return this._call('getAccountTransactions', req, callback);
        };

        API.prototype.getAccount = function (req, callback) {
            return this._call('getAccount&account=', req, callback);
        };

        API.prototype.getPeers = function (req, callback) {
            return this._call('getInboundPeers&includePeerInfo=true', req, callback);
        };

        API.prototype.getGenerators = function (req, callback) {
            return this._call('getNextBlockGenerators&limit=20', req, callback);
        };

        return API;
    })();
    JRS.API = API;
})(JRS || (JRS = {}));

module.exports = JRS;

