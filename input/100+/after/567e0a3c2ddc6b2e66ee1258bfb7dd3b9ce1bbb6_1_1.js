function() {
    var CustomSetModel = Backbone.Model.extend({
      defaults: {
        number_as_string: null //presence of defaults forces extend
      },

      validate: function (attributes) {
        if (!_.isString(attributes.num_as_string)) {
          return 'fail';
        }
      },

      set: function (attributes, options) {
        if (attributes.num_as_string) {
          attributes.num_as_string = attributes.num_as_string.toString();
        }
        Backbone.Model.prototype.set.call(this, attributes, options);
      }
    });

    var CustomSetCollection = Backbone.Collection.extend({
      model: CustomSetModel
    });
    var col = new CustomSetCollection([{ num_as_string: 2 }]);
    equals(col.length, 1);
  }