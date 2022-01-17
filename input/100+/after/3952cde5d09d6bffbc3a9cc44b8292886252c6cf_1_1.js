function(){
    var Col = Backbone.Collection.extend({
      comparator: function(model){ return model.id; }
    });
    var col = new Col([{id: 2}, {id: 1}], {
      comparator: false
    });
    var otherCol = new Col([{id: 2}, {id: 1}]);
    raises(function(){ col.sort() });
    equal(col.first().id, 2);
    equal(otherCol.first().id, 1);
  }