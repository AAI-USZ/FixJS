function findOrCreate(conditions, doc, options, callback) {
    if (arguments.length < 4) {
      if (_.isFunction(options)) {
        // Scenario: findOrCreate(conditions, doc, callback)
        callback = options;
        options = {};
      } else if (_.isFunction(doc)) {
        // Scenario: findOrCreate(doc, callback);
        callback = doc;
        doc = conditions;
        conditions = {};
        options = {};
      }
    }
    var self = this;
    this.findOne(conditions, function(err, result) {
      if(err || result) {
        if(options && options.upsert && !err) {
          self.update(conditions, doc, function(err, count){
            self.findOne(conditions, callback);
          })
        } else {
          callback(err, result)
        }
      } else {
        _.extend(conditions, doc)
        var obj = new self(conditions)
        obj.save(function(err) {
          callback(err, obj)
        });
      }
    })
  }