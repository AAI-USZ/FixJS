function(parentStoreKey, childStoreKey, key){
    var prs, crs, oldPk, oldChildren, pkRef;
    // Check the child to see if it has a parent
    crs = this.childRecords || {};
    prs = this.parentRecords || {};
    // first rid of the old parent
    oldPk = crs[childStoreKey];
    if (oldPk){
      oldChildren = prs[oldPk];
      if (oldChildren && oldChildren[childStoreKey]) {delete oldChildren[childStoreKey];}
      // this.recordDidChange(null, null, oldPk, key);
    }
    pkRef = prs[parentStoreKey] || {};
    pkRef[childStoreKey] = YES;
    prs[parentStoreKey] = pkRef;
    crs[childStoreKey] = parentStoreKey;
    // sync the status of the child
    this.writeStatus(childStoreKey, this.statuses[parentStoreKey]);
    this.childRecords = crs;
    this.parentRecords = prs;
  }