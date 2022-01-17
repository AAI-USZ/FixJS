function(idx) {
    var recs      = this._records, 
        children = this.get('readOnlyChildren'),
        hash, ret, pname = this.get('propertyName'),
        parent = this.get('record');
    var len = children ? children.length : 0;
    
    if (!children) return undefined; // nothing to do
    if (recs && (ret=recs[idx])) return ret ; // cached
    if (!recs) this._records = recs = [] ; // create cache
    
    // If not a good index return undefined
    if (idx >= len) return undefined;
    hash = children.objectAt(idx);
    if (!hash) return undefined;
    
    // not in cache, materialize
    recs[idx] = ret = parent.registerNestedRecord(hash, '%@.%@'.fmt(pname, idx));
    
    return ret;
  }