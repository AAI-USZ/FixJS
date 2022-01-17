function(model) {
      console.log('creating', model, 'in', this.name);
      if (!_.isObject(model)) {
        return model;
      }
      if (model.attributes != null) {
        model = model.attributes;
      }
      if (!model.id) {
        model.id = this.generateId();
      }
      localStorage.setItem(this.name + this.sep + model.id, JSON.stringify(model));
      this.records.push(model.id.toString());
      this.save();
      return model;
    }