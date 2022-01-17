function(callback) {
  var limit = (-1)*Math.abs(this.limitValue);
  
  // Create a new cursor and fetch the plan
  var cursor = new Cursor(this.db, this.collection, this.selector, this.fields, this.skipValue, limit
													, this.sortValue, this.hint, true, this.snapshot, this.timeout, this.tailable, this.batchSizeValue
													, this.slaveOk, this.raw, this.read, this.returnKey, this.maxScan, this.min, this.max, this.showDiskLoc
													, this.comment, this.awaitdata, this.numberOfRetries, this.dbName);
	// Fetch the explaination document												
  cursor.nextObject(function(err, item) {
    if(err != null) return callback(err, null);
    // close the cursor
    cursor.close(function(err, result) {
      if(err != null) return callback(err, null);
      callback(null, item);
    });
  });
}