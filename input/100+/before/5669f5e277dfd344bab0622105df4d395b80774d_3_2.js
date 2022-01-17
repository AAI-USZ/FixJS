function(msg, pkt){
  var self = this;
  self.collection = self.collection||self.db.collection(self.mqCollectionName, {safe: true});
  msg = {
    msg: msg,
    pkt: pkt,
    handled: false,
    emitted: new Date()
  };
  self.collection.insert(msg, function(){});
}