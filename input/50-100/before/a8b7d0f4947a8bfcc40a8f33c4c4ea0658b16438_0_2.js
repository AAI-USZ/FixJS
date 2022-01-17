function(key, element, resourceTable) {

  var self = this;

  this.element = element;

  this.resourceTable = resourceTable;



  element.change(function(){

    var filter = {};

    filter[key] = element.val();

    resourceTable.filter(filter);

  });

}