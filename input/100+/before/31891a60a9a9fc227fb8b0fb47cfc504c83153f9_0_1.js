function(self) {
  // Unpack the options
  var queryOptions = QueryCommand.OPTS_NONE;
  if(!self.timeout) {
    queryOptions |= QueryCommand.OPTS_NO_CURSOR_TIMEOUT;
  }

  if(self.tailable != null) {
    queryOptions |= QueryCommand.OPTS_TAILABLE_CURSOR;
    self.skipValue = self.limitValue = 0;

    // if awaitdata is set
    if(self.awaitdata != null) {
      queryOptions |= QueryCommand.OPTS_AWAIT_DATA;
    }
  }

  if(self.slaveOk) {
    queryOptions |= QueryCommand.OPTS_SLAVE;
  }

  // limitValue of -1 is a special case used by Db#eval
  var numberToReturn = self.limitValue == -1 ? -1 : limitRequest(self);

  // Check if we need a special selector
  if(self.sortValue != null || self.explainValue != null || self.hint != null || self.snapshot != null
      || self.returnKey != null || self.maxScan != null || self.min != null || self.max != null
      || self.showDiskLoc != null || self.comment != null) {

    // Build special selector
    var specialSelector = {'$query':self.selector};
    if(self.sortValue != null) specialSelector['orderby'] = utils.formattedOrderClause(self.sortValue);
    if(self.hint != null && self.hint.constructor == Object) specialSelector['$hint'] = self.hint;
    if(self.snapshot != null) specialSelector['$snapshot'] = true;
    if(self.returnKey != null) specialSelector['$returnKey'] = self.returnKey;
    if(self.maxScan != null) specialSelector['$maxScan'] = self.maxScan;
    if(self.min != null) specialSelector['$min'] = self.min;
    if(self.max != null) specialSelector['$max'] = self.max;
    if(self.showDiskLoc != null) specialSelector['$showDiskLoc'] = self.showDiskLoc;
    if(self.comment != null) specialSelector['$comment'] = self.comment;
    // If we have explain set only return a single document with automatic cursor close
    if(self.explainValue != null) {
      numberToReturn = numberToReturn < 1000 ? (-1*Math.abs(numberToReturn)) : numberToReturn;
      specialSelector['$explain'] = true;
    }

    // Return the query
    return new QueryCommand(self.db, self.collectionName, queryOptions, self.skipValue, numberToReturn, specialSelector, self.fields);
  } else {
    return new QueryCommand(self.db, self.collectionName, queryOptions, self.skipValue, numberToReturn, self.selector, self.fields);
  }
}