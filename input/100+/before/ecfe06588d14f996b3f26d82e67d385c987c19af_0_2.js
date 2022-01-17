function readDoc(event) {
      var cursor = event.target.result;
      // Cursor has exceeded the key range so the rest are inserts
      if (!cursor) {
        return docs.forEach(insertDoc);
      }
      var doc = docs.shift();
      if (cursor.key === doc.metadata.id) {
        updateDoc(cursor, cursor.value, doc);
      } else {
        insertDoc(doc);
      }
    }