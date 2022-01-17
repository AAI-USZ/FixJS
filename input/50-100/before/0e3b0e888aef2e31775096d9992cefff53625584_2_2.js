function(options, callback){
    if(this.categories.length > 0){
      this.core.domainInCategories(options.domain, this.categories, function(in_category){
        callback(null, in_category);
      });
    }else{
      //No categories... no match
      callback(null, false);
    }
  }