function(type, clientId, dataProxy) {
    var recordArrays = this.typeMapFor(type).recordArrays,
        filter;

    recordArrays.forEach(function(array) {
      filter = get(array, 'filterFunction');
      this.updateRecordArray(array, filter, type, clientId, dataProxy);
    }, this);

    // loop through all manyArrays containing an unloaded copy of this
    // clientId and notify them that the record was loaded.
    var manyArrays = this.loadingRecordArrays[clientId], manyArray;

    if (manyArrays) {
      for (var i=0, l=manyArrays.length; i<l; i++) {
        manyArrays[i].send('loadedRecords', 1);
      }

      this.loadingRecordArrays[clientId] = null;
    }
  }