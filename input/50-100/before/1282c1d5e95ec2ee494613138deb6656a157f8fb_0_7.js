function(env, data) {
        var attrs = {};
        for (var i in this.attributes) {
          var attr = this.attributes[i];
          attrs[attr.id] = attr.get({ __this__: this }, env, data);
        }
        return attrs;
      }