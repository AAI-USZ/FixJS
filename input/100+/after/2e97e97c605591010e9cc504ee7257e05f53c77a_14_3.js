function imedb() {
    var settings;

    /* name and version of IndexedDB */
    var kDBName = 'JSZhuyin';
    var kDBVersion = 2;

    var jsonData;
    var iDB;

    var iDBCache = {};
    var cacheTimer;
    var kCacheTimeout = 10000;

    var self = this;

    var indexedDB = window.indexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    var IDBDatabase = window.IDBDatabase ||
      window.webkitIDBDatabase ||
      window.msIDBDatabase;

    var IDBKeyRange = window.IDBKeyRange ||
      window.webkitIDBKeyRange ||
      window.msIDBKeyRange;

    var IDBIndex = window.IDBIndex ||
      window.webkitIDBIndex ||
      window.msIDBIndex;

    /* ==== init functions ==== */

    var getTermsInDB = function imedb_getTermsInDB(callback) {
      if (!indexedDB || // No IndexedDB API implementation
          IDBDatabase.prototype.setVersion || // old version of IndexedDB API
          window.location.protocol === 'file:') {  // bug 643318
        debug('IndexedDB is not available on this platform.');
        callback();
        return;
      }

      var req = indexedDB.open(kDBName, kDBVersion);
      req.onerror = function dbopenError(ev) {
        debug('Encounter error while opening IndexedDB.');
        callback();
      };

      req.onupgradeneeded = function dbopenUpgradeneeded(ev) {
        debug('IndexedDB upgradeneeded.');
        iDB = ev.target.result;

        // delete the old ObjectStore if present
        if (iDB.objectStoreNames.length !== 0)
          iDB.deleteObjectStore('terms');

        // create ObjectStore
        var store = iDB.createObjectStore('terms', { keyPath: 'syllables' });
        store.createIndex(
          'constantSyllables', 'constantSyllables', { unique: false });

        // no callback() here
        // onupgradeneeded will follow by onsuccess event
        return;
      };

      req.onsuccess = function dbopenSuccess(ev) {
        debug('IndexedDB opened.');
        iDB = ev.target.result;
        callback();
      };
    };

    var populateDBFromJSON = function imedbPopulateDBFromJSON(callback) {
      var chunks = [];
      var chunk = [];
      var i = 0;

      for (var syllables in jsonData) {
        chunk.push(syllables);
        i++;
        if (i > 2048) {
          chunks.push(chunk);
          chunk = [];
          i = 0;
        }
      }
      chunks.push(chunk);
      chunks.push(['_last_entry_']);
      jsonData['_last_entry_'] = true;

      var addChunk = function imedbAddChunk() {
        debug('Loading data chunk into IndexedDB, ' +
            (chunks.length - 1) + ' chunks remaining.');

        var transaction = iDB.transaction('terms', 'readwrite');
        var store = transaction.objectStore('terms');

        transaction.onerror = function putError(ev) {
          debug('Problem while populating DB with JSON data.');
        };

        transaction.oncomplete = function putComplete() {
          if (chunks.length) {
            window.setTimeout(addChunk, 0);
          } else {
            jsonData = null;
            window.setTimeout(callback, 0);
          }
        };

        var syllables;
        var chunk = chunks.shift();
        for (i in chunk) {
          var syllables = chunk[i];
          var constantSyllables = syllables.replace(/([^\-])[^\-]*/g, '$1');
          store.put({
            syllables: syllables,
            constantSyllables: constantSyllables,
            terms: jsonData[syllables]
          });
        }
      };

      window.setTimeout(addChunk, 0);
    };

    var getTermsJSON = function imedb_getTermsJSON(callback) {
      getWordsJSON(function getWordsJSONCallback() {
        getPhrasesJSON(callback);
      });
    };

    var getWordsJSON = function imedb_getWordsJSON(callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', (settings.wordsJSON || './words.json'), true);
      try {
        xhr.responseType = 'json';
      } catch (e) { }
      xhr.overrideMimeType('application/json; charset=utf-8');
      xhr.onreadystatechange = function xhrReadystatechange(ev) {
        if (xhr.readyState !== 4)
          return;

        var response;
        if (xhr.responseType == 'json') {
          response = xhr.response;
        } else {
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) { }
        }

        if (typeof response !== 'object') {
          debug('Failed to load words.json: Malformed JSON');
          callback();
          return;
        }

        jsonData = {};
        // clone everything under response coz it's readonly.
        for (var s in response) {
          jsonData[s] = response[s];
        }
        xhr = null;

        callback();
      };

      xhr.send(null);
    };

    var getPhrasesJSON = function getPhrasesJSON(callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', (settings.phrasesJSON || './phrases.json'), true);
      try {
        xhr.responseType = 'json';
      } catch (e) { }
      xhr.overrideMimeType('application/json; charset=utf-8');
      xhr.onreadystatechange = function xhrReadystatechange(ev) {
        if (xhr.readyState !== 4)
          return;

        var response;
        if (xhr.responseType == 'json') {
          response = xhr.response;
        } else {
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) { }
        }

        if (typeof response !== 'object') {
          debug('Failed to load phrases.json: Malformed JSON');
          callback();
          return;
        }

        // clone everything under response coz it's readonly.
        for (var s in response) {
          jsonData[s] = response[s];
        }
        xhr = null;

        callback();
      };

      xhr.send(null);
    };

    /* ==== helper functions ==== */

    /*
    * Math function that return all possible compositions of
    * a given natural number
    * callback will be called 2^(n-1) times.
    *
    * ref: http://en.wikipedia.org/wiki/Composition_(number_theory)#Examples
    * also: http://stackoverflow.com/questions/8375439
    *
    */
    var compositionsOf = function imedb_compositionsOf(n, callback) {
      var x, a, j;
      x = 1 << n - 1;
      while (x--) {
        a = [1];
        j = 0;
        while (n - 1 > j) {
          if (x & (1 << j)) {
            a[a.length - 1]++;
          } else {
            a.push(1);
          }
          j++;
        }
        callback.call(this, a);
      }
    };

    /*
    * Data from IndexedDB gets to kept in iDBCache for kCacheTimeout seconds
    */
    var cacheSetTimeout = function imedb_cacheSetTimeout() {
      debug('Set iDBCache timeout.');
      clearTimeout(cacheTimer);
      cacheTimer = window.setTimeout(function imedb_cacheTimeout() {
        debug('Empty iDBCache.');
        iDBCache = {};
      }, kCacheTimeout);
    };

    var getTermsFromConstantSyllables =
        function imedb_getTermsFromConstantSyllables(constants, callback) {
      debug('Getting terms with constantSyllables: ' + constants);

      if (iDBCache['CONSTANT:' + constants]) {
        debug('Found constantSyllables result in iDBCache.');
        callback(iDBCache['CONSTANT:' + constants]);
        return;
      }

      var store = iDB.transaction('terms', 'readonly')
        .objectStore('terms');
      if (IDBIndex.prototype.mozGetAll) {
        // Mozilla IndexedDB extension
        var req = store.index('constantSyllables').mozGetAll(
          IDBKeyRange.only(constants));
      } else {
        var req = store.index('constantSyllables').openCursor(
          IDBKeyRange.only(constants));
      }
      req.onerror = function getdbError(ev) {
        debug('Database read error.');
        callback(false);
      };
      var constantResult = [];
      req.onsuccess = function getdbSuccess(ev) {
        if (ev.target.result && ev.target.result.constructor == Array) {
          constantResult = ev.target.result;
          cacheSetTimeout();
          iDBCache['CONSTANT:' + constants] = constantResult;
          callback(constantResult);
          return;
        }
        var cursor = ev.target.result;
        if (!cursor) {
          cacheSetTimeout();
          iDBCache['CONSTANT:' + constants] = constantResult;
          callback(constantResult);
          return;
        }
        iDBCache[cursor.value.syllables] = cursor.value.terms;
        constantResult.push(cursor.value);
        cursor.continue();
      };
    };

    /* ==== init ==== */

    this.init = function imedb_init(options) {
      settings = options;

      var ready = function imedbReady() {
        debug('Ready.');
        if (settings.ready)
          settings.ready();
      };

      if (!settings.enableIndexedDB) {
        debug('IndexedDB disabled; Downloading JSON ...');
        getTermsJSON(ready);
        return;
      }

      debug('Probing IndexedDB ...');
      getTermsInDB(function getTermsInDBCallback() {
        if (!iDB) {
          debug('IndexedDB not available; Downloading JSON ...');
          getTermsJSON(ready);
          return;
        }

        var transaction = iDB.transaction('terms');

        var req = transaction.objectStore('terms').get('_last_entry_');
        req.onsuccess = function getdbSuccess(ev) {
          if (ev.target.result !== undefined) {
            ready();
            return;
          }

          debug('IndexedDB is supported but empty; Downloading JSON ...');
          getTermsJSON(function getTermsInDBCallback() {
            if (!jsonData) {
              debug('JSON failed to download.');
              return;
            }

            debug(
              'JSON loaded,' +
              'IME is ready to use while inserting data into db ...'
            );
            ready();
            populateDBFromJSON(function getTermsInDBCallback() {
              debug('IndexedDB ready and switched to indexedDB backend.');
            });
          });
        };
      });
    };

    /* ==== uninit ==== */

    this.uninit = function imedb_uninit() {
      if (iDB)
        iDB.close();
      jsonData = null;
    };

    /* ==== db lookup functions ==== */

    this.getSuggestions =
      function imedb_getSuggestions(syllables, text, callback) {
      if (!jsonData && !iDB) {
        debug('Database not ready.');
        callback(false);
        return;
      }

      var syllablesStr = syllables.join('-').replace(/ /g , '');
      var result = [];
      var matchTerm = function matchTerm(term) {
        if (term[0].substr(0, textStr.length) !== textStr)
          return;
        if (term[0] == textStr)
          return;
        result.push(term);
      };
      var processResult = function processResult(r) {
        r = r.sort(
          function sort_result(a, b) {
            return (b[1] - a[1]);
          }
        );
        var result = [];
        var t = [];
        r.forEach(function(term) {
          if (t.indexOf(term[0]) !== -1) return;
          t.push(term[0]);
          result.push(term);
        });
        return result;
      };
      var matchRegEx;
      if (syllablesStr.indexOf('*') !== -1) {
        matchRegEx = new RegExp(
          '^' + syllablesStr.replace(/\-/g, '\\-')
                .replace(/\*/g, '[^\-]*'));
      }
      var textStr = text.join('');
      var result = [];

      debug('Get suggestion for ' + textStr + '.');

      if (typeof iDBCache['SUGGESTION:' + textStr] !== 'undefined') {
        debug('Found in iDBCache.');
        cacheSetTimeout();
        callback(iDBCache['SUGGESTION:' + textStr]);
        return;
      }

      if (jsonData) {
        debug('Lookup in JSON.');
        // XXX: this is not efficient
        for (var s in jsonData) {
          if (matchRegEx) {
            if (!matchRegEx.exec(s))
              continue;
          } else if (s.substr(0, syllablesStr.length) !== syllablesStr) {
            continue;
          }
          var terms = jsonData[s];
          terms.forEach(matchTerm);
        }
        if (result.length) {
          result = processResult(result);
        } else {
          result = false;
        }
        cacheSetTimeout();
        iDBCache['SUGGESTION:' + textStr] = result;
        callback(result);
        return;
      }

      debug('Lookup in IndexedDB.');

      var findSuggestionsInIDB = function findSuggestionsInIDB() {
        var upperBound = syllablesStr.substr(0, syllablesStr.length - 1) +
          String.fromCharCode(
            syllablesStr.substr(syllablesStr.length - 1).charCodeAt(0) + 1);

        debug('Do IndexedDB range search with lowerBound ' + syllablesStr +
          ' and upperBound ' + upperBound + '.');

        var store = iDB.transaction('terms', 'readonly')
          .objectStore('terms');
        if (IDBIndex.prototype.mozGetAll) {
          // Mozilla IndexedDB extension
          var req = store.mozGetAll(
            IDBKeyRange.bound(syllablesStr, upperBound, true, true));
        } else {
          var req = store.openCursor(
            IDBKeyRange.bound(syllablesStr, upperBound, true, true));
        }
        req.onerror = function getdbError(ev) {
          debug('Database read error.');
          callback(false);
        };
        var finish = function index_finish() {
          if (result.length) {
            result = processResult(result);
          } else {
            result = false;
          }
          cacheSetTimeout();
          iDBCache['SUGGESTION:' + textStr] = result;
          callback(result);
        };
        req.onsuccess = function getdbSuccess(ev) {
          if (ev.target.result && ev.target.result.constructor == Array) {
            ev.target.result.forEach(function index_forEach(value) {
              value.terms.forEach(matchTerm);
            });
            finish();
            return;
          }
          var cursor = ev.target.result;
          if (!cursor) {
            finish();
            return;
          }
          cursor.value.terms.forEach(matchTerm);
          cursor.continue();
        };
      };

      if (!matchRegEx) {
        findSuggestionsInIDB();
        return;
      }
      debug('Attempt to resolve the complete syllables of ' + textStr +
        ' from ' + syllablesStr + '.');
      var constants = syllablesStr.replace(/([^\-])[^\-]*/g, '$1');
      getTermsFromConstantSyllables(
        constants, function gotTerms(constantResult) {
          if (!constantResult) {
            callback(false);
            return;
          }
          constantResult.some(function(obj) {
            if (!matchRegEx.exec(obj.syllables))
              return false;
            return obj.terms.some(function term_forEach(term) {
              if (term[0] === textStr) {
                debug('Found ' + obj.syllables);
                syllablesStr = obj.syllables;
                return true;
              }
              return false;
            });
          });
          findSuggestionsInIDB();
        }
      );
    },

    this.getTerms = function imedb_getTerms(syllables, callback) {
      if (!jsonData && !iDB) {
        debug('Database not ready.');
        callback(false);
        return;
      }

      var syllablesStr = syllables.join('-').replace(/ /g , '');
      var matchRegEx;
      if (syllablesStr.indexOf('*') !== -1) {
        matchRegEx = new RegExp(
          '^' + syllablesStr.replace(/\-/g, '\\-')
                .replace(/\*/g, '[^\-]*') + '$');
        var processResult = function processResult(r) {
          r = r.sort(
            function sort_result(a, b) {
              return (b[1] - a[1]);
            }
          );
          var result = [];
          var t = [];
          r.forEach(function(term) {
            if (t.indexOf(term[0]) !== -1) return;
            t.push(term[0]);
            result.push(term);
          });
          return result;
        };
      }

      debug('Get terms for ' + syllablesStr + '.');

      if (typeof iDBCache[syllablesStr] !== 'undefined') {
        debug('Found in iDBCache.');
        cacheSetTimeout();
        callback(iDBCache[syllablesStr]);
        return;
      }

      if (jsonData) {
        debug('Lookup in JSON.');
        if (!matchRegEx) {
          callback(jsonData[syllablesStr] || false);
          return;
        }
        debug('Do range search in JSON data.');
        var result = [];
        var dash = /\-/g;
        // XXX: this is not efficient
        for (var s in jsonData) {
          if (!matchRegEx.exec(s))
            continue;
          result = result.concat(jsonData[s]);
        }
        if (result.length) {
          result = processResult(result);
        } else {
          result = false;
        }
        cacheSetTimeout();
        iDBCache[syllablesStr] = result;
        callback(result);
        return;
      }

      debug('Lookup in IndexedDB.');

      if (!matchRegEx) {
        var store = iDB.transaction('terms', 'readonly')
          .objectStore('terms');
        var req = store.get(syllablesStr);
        req.onerror = function getdbError(ev) {
          debug('Database read error.');
          callback(false);
        };

        req.onsuccess = function getdbSuccess(ev) {
          cacheSetTimeout();

          if (!ev.target.result) {
            iDBCache[syllablesStr] = false;
            callback(false);
            return;
          }

          iDBCache[syllablesStr] = ev.target.result.terms;
          callback(ev.target.result.terms);
        };
        return;
      }
      debug('Do range search in IndexedDB.');
      var constants = syllablesStr.replace(/([^\-])[^\-]*/g, '$1');
      getTermsFromConstantSyllables(
        constants,
        function gotTerms(constantResult) {
          var result = [];
          if (!constantResult) {
            callback(false);
            return;
          }
          constantResult.forEach(function(obj) {
            if (matchRegEx.exec(obj.syllables))
              result = result.concat(obj.terms);
          });
          if (result.length) {
            result = processResult(result);
          } else {
            result = false;
          }
          cacheSetTimeout();
          iDBCache[syllablesStr] = result;
          callback(result);
        }
      );
    };

    this.getTermWithHighestScore =
    function imedb_getTermWithHighestScore(syllables, callback) {
      self.getTerms(syllables, function getTermsCallback(terms) {
        if (!terms) {
          callback(false);
          return;
        }
        callback(terms[0]);
      });
    }

    this.getSentences = function imedb_getSentences(syllables, callback) {
      var sentences = [];
      var n = 0;

      compositionsOf.call(
        this,
        syllables.length,
        /* This callback will be called 2^(n-1) times */
        function compositionsOfCallback(composition) {
          var str = [];
          var start = 0;
          var i = 0;

          var next = function composition_next() {
            var numOfWord = composition[i];
            if (composition.length === i)
              return finish();
            i++;
            self.getTermWithHighestScore(
              syllables.slice(start, start + numOfWord),
              function getTermWithHighestScoreCallback(term) {
                if (!term && numOfWord > 1)
                  return finish();
                if (!term) {
                  var syllable =
                    syllables.slice(start, start + numOfWord).join('');
                  debug('Syllable ' + syllable +
                    ' does not made up a word, insert symbol.');
                  term = [syllable.replace(/\*/g, ''), -7];
                }

                str.push(term);
                start += numOfWord;
                next();
              }
            );
          };

          var finish = function compositionFinish() {
            // complete; this composition does made up a sentence
            if (start === syllables.length)
              sentences.push(str);

            if (++n === (1 << (syllables.length - 1))) {
              cacheSetTimeout();

              sentences = sentences.sort(function sortSentences(a, b) {
                var scoreA = 0;

                a.forEach(function countScoreA(term) {
                  scoreA += term[1];
                });

                var scoreB = 0;
                b.forEach(function countScoreB(term) {
                  scoreB += term[1];
                });

                return (scoreB - scoreA);
              });

              callback(sentences);
            }
          };

          next();
        }
      );
    };
  }