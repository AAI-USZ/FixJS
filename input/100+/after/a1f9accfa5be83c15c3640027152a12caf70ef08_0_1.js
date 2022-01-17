function () {
        // Grab sessionStorage from top window
        var _sessionStorage = top.sessionStorage;

        // Try to use original sessionStorage
        if (_sessionStorage) {
            try {
                // Test to make sure it works and isn't full
                _sessionStorage.setItem(_TESTID, 1);
                _sessionStorage.removeItem(_TESTID);

                // Now clone sessionStorage so that we may extend it with our own methods
                var _tmp = function () {
                };
                _tmp.prototype = _sessionStorage;
                _tmp = new _tmp();
                try {
                    if (_tmp.getItem) {
                        _tmp.setItem(_TESTID, 2);
                        _tmp.removeItem(_TESTID);
                    }
                } catch (e) {
                    // Firefox 14+ throws a security exception when wrapping a native class
                    _tmp = null;
                }

                if (_tmp && !_tmp.getItem) {
                    // Internet Explorer 8 does not inherit the prototype here. We can hack around it using a DOM object
                    _sessionStorage = _createDOMStorage('sessionstorage', _sessionStorage);
                } else if (!_tmp || Object.prototype.toString.apply(Storage.prototype) === '[object StoragePrototype]') {
                    // Safari throws a type error when extending with Storage
                    _sessionStorage = _createReferencedStorage('sessionstorage', _sessionStorage);
                } else {
                    _sessionStorage = _tmp;
                }
            } catch (e) {
                _sessionStorage = null;
            }
        }

        // Build one
        if (!_sessionStorage) {
            try {
                // instantiate nameStorage
                _sessionStorage = _createNameStorage();

                // Test it
                _sessionStorage.setItem(_TESTID, 2);
                if (_sessionStorage.getItem(_TESTID) == 2) {
                    _sessionStorage.removeItem(_TESTID);
                } else {
                    _sessionStorage = null;
                }
            } catch (e) {
                _sessionStorage = null;
            }

            // Last ditch effort: use memory storage
            if (!_sessionStorage) {
                _sessionStorage = _createMemoryStorage();
            }
        }

        // Rewire functions to use a prefix and avoid collisions
        // @todo Rewire length for prefixes as well
        _sessionStorage._getItem    = _sessionStorage.getItem;
        _sessionStorage._setItem    = _sessionStorage.setItem;
        _sessionStorage._removeItem = _sessionStorage.removeItem;
        _sessionStorage._key        = _sessionStorage.key;

        _sessionStorage.getItem    = function (key) {
            return _sessionStorage._getItem(PREFIX + key);
        };
        _sessionStorage.setItem    = function (key, data) {
            return _sessionStorage._setItem(PREFIX + key, data);
        };
        _sessionStorage.removeItem = function (key) {
            return _sessionStorage._removeItem(PREFIX + key);
        };
        _sessionStorage.key        = function (index) {
            if ((index = _sessionStorage._key(index)) !== undefined && index !== null) {
                // Chop off the index
                return index.indexOf(PREFIX) === 0 ? index.substr(PREFIX.length) : index;
            }
            return null;
        };
        _sessionStorage.clear      = function () {
            for (var i = _sessionStorage.length, j; i--;) {
                if ((j = _sessionStorage._key(i)).indexOf(PREFIX) === 0) {
                    _sessionStorage._removeItem(j);
                }
            }
        };
        return _sessionStorage;
    }