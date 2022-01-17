function (data, estimatedEntropy, source) {
    source = source || "user";
  
    var id,
      i, ty = 0, tmp,
      t = (new Date()).valueOf(),
      robin = this._robins[source],
      oldReady = this.isReady();
      
    id = this._collectorIds[source];
    if (id === undefined) { id = this._collectorIds[source] = this._collectorIdNext ++; }
      
    if (robin === undefined) { robin = this._robins[source] = 0; }
    this._robins[source] = ( this._robins[source] + 1 ) % this._pools.length;
  
    switch(typeof(data)) {
      
    case "number":
      data=[data];
      ty=1;
      break;
      
    case "object":
      if (estimatedEntropy === undefined) {
       /* horrible entropy estimator */
       estimatedEntropy = 0;
       for (i=0; i<data.length; i++) {
          tmp= data[i];
          while (tmp>0) {
           estimatedEntropy++;
           tmp = tmp >>> 1;
          }
        }
      }
      this._pools[robin].update([id,this._eventId++,ty||2,estimatedEntropy,t,data.length].concat(data));
      break;
      
    case "string":
      if (estimatedEntropy === undefined) {
       /* English text has just over 1 bit per character of entropy.
        * But this might be HTML or something, and have far less
        * entropy than English...  Oh well, let's just say one bit.
        */
       estimatedEntropy = data.length;
      }
      this._pools[robin].update([id,this._eventId++,3,estimatedEntropy,t,data.length]);
      this._pools[robin].update(data);
      break;
      
    default:
      
      throw new sjcl.exception.bug("random: addEntropy only supports number, array or string");
    }
  
    /* record the new strength */
    this._poolEntropy[robin] += estimatedEntropy;
    this._poolStrength += estimatedEntropy;
  
    /* fire off events */
    if (oldReady === this._NOT_READY) {
      if (this.isReady() !== this._NOT_READY) {
        this._fireEvent("seeded", Math.max(this._strength, this._poolStrength));
      }
      this._fireEvent("progress", this.getProgress());
    }
  }