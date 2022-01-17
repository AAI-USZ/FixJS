function () {
        var _localStorage;

        if (top.localStorage || top.globalStorage) {
            try {
                _localStorage = top.localStorage || top.globalStorage[location.hostname];
                _localStorage.setItem(_TESTID, 1);
                _localStorage.removeItem(_TESTID);

                // Now clone sessionStorage so that we may extend it with our own methods
                var _tmp = function () {};
                _tmp.prototype = _localStorage;
                _tmp = new _tmp();

                if (!_tmp.getItem) {
                    // Internet Explorer 8 does not inherit the prototype here. We can hack around it using a DOM object
                    _localStorage = _createDOMStorage('localstorage', _localStorage);
                } else if (Object.prototype.toString.apply(Storage.prototype) === '[object StoragePrototype]') {
                    // Safari throws a type error when extending with Storage
                    _localStorage = _createReferencedStorage('localstorage', _localStorage);
                } else {
                    // Spec
                    _localStorage = _tmp;
                }
            } catch (e) {
                _localStorage = null;
            }
        }

        // Did not work, try userData, cookie, or memory:
        if (!_localStorage) {
            _localStorage = (function () {
                /**
                 * @param {String} str
                 * @return {String}
                 */

                var _esc = function (str) {
                    return 'PS' + str.replace(_e, '__').replace(_s, '_s');
                },
                    _e = /_/g,
                    _s = / /g,
                    _PREFIX = _esc(PREFIX + 'uData'),
                    _NAME = _esc('Storer');

                if (window.ActiveXObject) {
                    // Try userData
                    try {
                        // Data cache
                        var _data = {}, // key : data
                            _keys = [], // _keys key : _ikey key
                            _ikey = {}, // _ikey key : _keys key
                        /** @namespace userData */
                            userData = {
                                STORE_TYPE: 'userData',

                                /** # of items */
                                length: 0,

                                /**
                                 * Returns key of i
                                 * @param {int} i
                                 * @return {String}
                                 */
                                key: function (i) {
                                    return _keys[i];
                                },

                                /**
                                 * Gets data of key
                                 * @param {String} key
                                 * @return {String}
                                 */
                                getItem: function (key) {
                                    return el.getAttribute(_esc(key));
                                },

                                /**
                                 * Sets key to data
                                 * @param {String} key
                                 * @param {String} data
                                 * @return {String} data
                                 */
                                setItem: function (key, data) {
                                    if (data !== null && data !== undefined) {
                                        el.setAttribute(_esc(key), data);
                                        _ikey[key] === undefined && (_ikey[key] = (userData.length = _keys.push(key)) - 1);
                                        el.save(_PREFIX + _NAME);
                                        return (_data[key] = data);
                                    }
                                    return userData.removeItem(key);
                                },

                                /**
                                 * Removes item at key
                                 * @param {String} key
                                 * @return {Boolean}
                                 */
                                removeItem: function (key) {
                                    el.removeAttribute(_esc(key));
                                    if (_ikey[key] !== undefined) {
                                        // re-reference all the keys because we've removed an item in between
                                        for (var i = _keys.length; --i > _ikey[key];) {
                                            _ikey[_keys[i]]--;
                                        }
                                        _keys.splice(_ikey[key], 1);
                                        delete _ikey[key];
                                    }
                                    el.save(_PREFIX + _NAME);
                                    userData.length = _keys.length;

                                    return true;
                                },

                                /**
                                 * Clears all data
                                 */
                                clear: function () {
                                    for (var doc = el.xmlDocument,
                                             attributes = doc.firstChild.attributes,
                                             attr,
                                             i = attributes.length;
                                         0 <= --i;) {
                                        attr = attributes[i];
                                        delete _data[attr.nodeName]; // remove from cache
                                        el.removeAttribute(attr.nodeName); // use the standard DOM properties to remove the item
                                        userData.length--;
                                    }
                                    el.save(_PREFIX + _NAME);
                                    userData.length = _keys.length = 0;
                                    _data = {};
                                    _ikey = {};
                                }
                            };

                        // Init userData element
                        var el = document.createElement('input');
                        el.style.display = 'none';
                        el.addBehavior('#default#userData');

                        var fn = (typeof domReady === 'function' ? domReady : (typeof jQuery !== 'undefined' ? jQuery(document).ready : false));
                        _callbackNow = !fn;

                        fn && fn(function () {
                            try {
                                var bod = document.body || document.getElementsByTagName('head')[0];
                                bod.appendChild(el);
                                el.load(_PREFIX + _NAME);

                                // Test
                                userData.setItem(_TESTID, 3);
                                if (userData.getItem(_TESTID) == 3) {
                                    userData.removeItem(_TESTID);

                                    // Good. Parse.
                                    var attr,
                                    // the reference to the XMLDocument
                                        doc = el.xmlDocument,
                                    // the root element will always be the firstChild of the XMLDocument
                                        attributes = doc.firstChild.attributes,
                                        i = -1,
                                        len = attributes.length;
                                    while (++i < len) {
                                        attr = attributes[i];
                                        if (attr.nodeValue !== undefined && attr.nodeValue !== null) {
                                            _ikey[attr.nodeName] = _keys.push(attr.nodeName) - 1;
                                            _data[attr.nodeName] = attr.nodeValue; // use the standard DOM properties to retrieve the key and value
                                        }
                                    }

                                    _returnable.localStorage = localStorage = userData;
                                    callback && callback(_returnable);
                                } else {
                                    userData = null;
                                }
                            } catch (e) {
                                userData = null;
                            }

                            if (!userData) {
                                _returnable.localStorage = localStorage = _localStorage = _createCookieStorage();
                                callback && callback(_returnable);
                            }
                        });

                        return userData;
                    } catch (e) {}
                }
            }());
        }

        if (!_localStorage) {
            _localStorage = _createCookieStorage();
        }

        // Use the object natively without a prefix
        if (!PREFIX) {
            return _localStorage;
        }

        // Rewire functions to use a prefix and avoid collisions
        // @todo Rewire length for prefixes as well
        _localStorage._getItem    = _localStorage.getItem;
        _localStorage._setItem    = _localStorage.setItem;
        _localStorage._removeItem = _localStorage.removeItem;
        _localStorage._key        = _localStorage.key;

        _localStorage.getItem    = function (key) {
            return _localStorage._getItem(PREFIX + key);
        };
        _localStorage.setItem    = function (key, data) {
            return _localStorage._setItem(PREFIX + key, data);
        };
        _localStorage.removeItem = function (key) {
            return _localStorage._removeItem(PREFIX + key);
        };
        _localStorage.key        = function (index) {
            if ((index = _localStorage._key(index)) !== undefined && index !== null) {
                // Chop off the index
                return index.indexOf(PREFIX) === 0 ? index.substr(PREFIX.length) : index;
            }
            return null;
        };
        _localStorage.clear      = function () {
            for (var i = _localStorage.length, j; i--;) {
                if ((j = _localStorage._key(i)).indexOf(PREFIX) === 0) {
                    _localStorage._removeItem(j);
                }
            }
        };

        return _localStorage;
    }