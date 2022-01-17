function (msg) {
        var doc = self._collection.findOne(msg.id);

        if (doc
            && (!msg.set)
            && _.difference(_.keys(doc), msg.unset, ['_id']).length === 0) {
          // what's left is empty, just remove it.  cannot fail.
          self._collection.remove(msg.id);
        } else if (doc) {
          var mutator = {$set: msg.set, $unset: {}};
          _.each(msg.unset, function (propname) {
            mutator.$unset[propname] = 1;
          });
          // XXX error check return value from update.
          self._collection.update(msg.id, mutator);
        } else {
          // XXX error check return value from insert.
          if (msg.set)
            self._collection.insert(_.extend({_id: msg.id}, msg.set));
        }
      }