function findSuggestionsInIDB() {
        var upperBound = syllablesStr.substr(0, syllablesStr.length - 1) +
          String.fromCharCode(
            syllablesStr.substr(syllablesStr.length - 1).charCodeAt(0) + 1);

        debug('Do IndexedDB range search with lowerBound ' + syllablesStr +
          ' and upperBound ' + upperBound + '.');

        var store = iDB.transaction('terms', 'readonly')
          .objectStore('terms');
        if (IDBIndex.prototype.getAll) {
          // Mozilla IndexedDB extension
          var req = store.getAll(
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
      }