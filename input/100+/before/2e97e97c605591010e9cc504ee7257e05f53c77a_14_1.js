function imedb_getTermsFromConstantSyllables(constants, callback) {
      debug('Getting terms with constantSyllables: ' + constants);

      if (iDBCache['CONSTANT:' + constants]) {
        debug('Found constantSyllables result in iDBCache.');
        callback(iDBCache['CONSTANT:' + constants]);
        return;
      }

      var store = iDB.transaction('terms', 'readonly')
        .objectStore('terms');
      if (IDBIndex.prototype.getAll) {
        // Mozilla IndexedDB extension
        var req = store.index('constantSyllables').getAll(
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
    }