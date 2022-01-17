function(forMsg, passive, callback, cursor){
  var self = this;
  var doCallback = function(err, msg){
      var next = function(){
        self.getCursor(forMsg, passive, callback, cursor);
      };
      if(typeof(callback)=='function') callback(err, msg?msg.pkt:false, next);
    };
  if(typeof(passive)=='function'){
    callback = passive;
    passive = false;
  }
  self.collection = self.collection||self.db.collection(self.mqCollectionName, {safe: true});
  if(passive){
    cursor = cursor || self.collection.find({$and: [{msg: forMsg}, {$or: [{handled: false}, {handled: {$exists: false}}]}]}, {tailable: true});
    cursor.nextObject(function(err, msg){
      if(typeof(callback)=='function') doCallback(err, (msg&&msg.length)>0?msg[0]:msg);
    });
  }else{
    cursor = cursor || self.collection.find({$and: [{msg: forMsg}, {$or: [{handled: false}, {handled: {$exists: false}}]}]}, {tailable: true});
    cursor.nextObject(function(err, msg){
      self.collection.findAndModify((msg&&msg.length)>0?msg[0]:msg, {emitted: -1}, {$set: {handled: true}}, {tailable: true},
        function(err, data){
          if(err||(!data)) self.getCursor(forMsg, passive, callback); // someone else picked it up
          else doCallback(err, data);
        });
    });
  }
}