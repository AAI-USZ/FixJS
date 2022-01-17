function() {
    var Collection = Backbone.Collection.extend({
      initialize: function() {
        this.one = 1;
      }
    });
    var coll = new Collection;
    equals(coll.one, 1);
  }