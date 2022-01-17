function(defaultValues) {
      return Backbone.Model.extend({
        defaults: function() {
          return defaultValues;
        },
        
        idAttribute: '_id',
        
        initialize: function() {
          var selectable = new Backbone.Picky.Selectable(this);
          _.extend(this, selectable);
        }
      })
    }