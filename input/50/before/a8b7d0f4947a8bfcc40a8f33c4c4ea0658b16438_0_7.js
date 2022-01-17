function(filterValues) {

  var self = this;

  _.each(filterValues, function(value, key){

    self.filters[key].setValue(value); 

  });

}