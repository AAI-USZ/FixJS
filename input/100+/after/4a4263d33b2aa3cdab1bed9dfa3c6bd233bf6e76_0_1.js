function(association, name) {
        var collection, constructor, obj, self;
        if (association.model != null) {
          obj = attributes[name];
          if (obj instanceof Backbone.Model) {
            obj = obj.attributes;
          }
          if (obj == null) {
            return;
          }
          _this[name] = new association.model(obj);
          return attributes[name] = _this[name].id;
        } else {
          collection = attributes[name];
          if (collection instanceof Backbone.Collection) {
            collection = collection.models;
          }
          if (_this[name] != null) {
            if (_.isArray(collection)) {
              _this[name].reset(collection);
            }
          } else {
            self = _this;
            constructor = (function(_super1) {

              __extends(constructor, _super1);

              constructor.name = 'constructor';

              function constructor() {
                if (association.url != null) {
                  this.url = association.url;
                }
                if (association.scope != null) {
                  this[association.scope] = self;
                }
                constructor.__super__.constructor.apply(this, arguments);
              }

              return constructor;

            })(association.collection);
            _this[name] = new constructor(collection);
          }
          if (collection != null) {
            return attributes[name] = _.compact(_.map(collection, function(el) {
              if (!_.isObject(el)) {
                return el;
              }
              return el.id;
            }));
          }
        }
      }