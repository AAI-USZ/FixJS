function Entity(node) {
    var value = new Expression(node.value);
    var index = [];
    node.index.forEach(function(ind) {
      index.push(new Expression(ind));
    });
    var attributes = {};
    node.attrs.forEach(function(attr) {
      attributes[attr.id] = new Attribute(attr);
    });

    return {
      id: node.id,
      value: value,
      index: index,
      attributes: attributes,
      local: node.local || false,
      get: function(env, data, index) {
        index = index || this.index || [];
        return this.value({ __this__: this }, env, data, index);
      },
      getAttribute: function(name, env, data) {
        return this.attributes[name].get({ __this__: this }, env, data);
      },
      getAttributes: function(env, data) {
        var attrs = {};
        for (var i in this.attributes) {
          var attr = this.attributes[i];
          attrs[attr.id] = attr.get({ __this__: this }, env, data);
        }
        return attrs;
      },
      getEntity: function(env, data) {
        return {
          value: this.get(env, data),
          attributes: this.getAttributes(env, data),
        };
      }
    };
  }