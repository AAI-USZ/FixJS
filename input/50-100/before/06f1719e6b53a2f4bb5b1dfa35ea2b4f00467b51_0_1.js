function(obj, selector, method){
        var self = this;
        if (!util.isAgility(obj)) {
          throw "agility.js: append argument is not an agility object";
        }
        this._container.children[obj._id] = obj; // children is *not* an array; this is for simpler lookups by global object id
        this.trigger(method, [obj, selector]);
        // ensures object is removed from container when destroyed:
        obj.bind('destroy', function(event, id){ 
          self._container.remove(id);
        });
        return this;
      }