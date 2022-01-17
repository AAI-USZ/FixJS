function(entity, tgt_type) {
               // tgt_type is an array of property names
               // entity is a Backbone.Model
               // console.log(" tgt type ", tgt_type, " KEYS : ", _(entity.attributes).keys(), _(tgt_type).without(_(entity.attributes).keys()));
               if (! entity instanceof Backbone.Model) {
                   console.log("Got > ", entity);
                   return false;
               }
               if (!_(entity.attributes).isObject()) {
                   console.log("Weird entity : ", entity, entity.attributes);
               }
               return _(tgt_type).difference(_(entity.attributes).keys()).length == 0;
           }