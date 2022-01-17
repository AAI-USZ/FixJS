function(hash) {
    var self = this;
    Ember.changeProperties(function(){
      for(var prop in hash) {
        if (hash.hasOwnProperty(prop)) set(self, prop, hash[prop]);
      }
    });
    return this;
  }