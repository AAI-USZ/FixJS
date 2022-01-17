function explainSource(source) {
      if (!source)
        return 'unknown source';
      if (source instanceof IDBObjectStore)
        return 'object store "' + source.name + '"';
      if (source instanceof IDBIndex)
        return 'index "' + source.name + '" on object store "' +
          source.objectStore.name + '"';
      if (source instanceof IDBCursor)
        return 'cursor on ' + explainSource(source.source);
      return 'unexpected source';
    }