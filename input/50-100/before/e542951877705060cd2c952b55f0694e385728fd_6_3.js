function(){
        //set all collections in "collections" object to the view options object
        var that = this,
            collections = this.options.collections, 
            keys = _.keys( collections );
        _.each(keys, function(key){
          that.options[key] = collections[key];
        });
        //delete this.options.collections;
      }