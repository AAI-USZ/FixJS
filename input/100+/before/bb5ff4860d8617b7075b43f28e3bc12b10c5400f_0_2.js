function (error, result) {
    var doc, lastMax;
    if (error || !result) { return callback && callback(error); }

    doc = result.document;
    if (doc) {
      if (doc.ServerHi) {
        // We have the older format ServerHi document, convert to the new Max which supports changing capacity
        doc.max = (doc.ServerHi - 1) * self.capacity;
        doc.ServerHi = undefined;
      }

      lastMax = doc.max;
      doc.max += self.capacity;
      self.client.putDocument(self.documentPrefix + entityName, doc, function (error, result) {
        if (error || !result) { return callback && callback(error); }
        if (!result.ok) { return callback && callback(new Error('Unable to update HiLO metadata')); }

        self.entityGenerators[entityName].currentMax = doc.max;
        if (self.entityGenerators[entityName].getMaxInProgress && 
            !self.entityGenerators[entityName].getMaxDone)
            self.entityGenerators[entityName].lastId = lastMax;
        return callback && callback(undefined);
      });
    } else {
      // Doc doesn't exist on server, so create a new one
      doc = { max: self.capacity, '@metadata' : { 'etag' : '00000000-0000-0000-000000000000' } };
      self.client.putDocument(self.documentPrefix + entityName, doc, function (error, result) {
        if (error || !result) { return callback && callback(error); }
        if (!result.ok) { return callback && callback(new Error('Unable to update HiLoKeyGenerator metadata')); }
    
        self.entityGenerators[entityName].currentMax = doc.max;
        self.entityGenerators[entityName].lastId = 0;

        return callback && callback(undefined);
      });
    }
  }