function(data) {
    var model = data instanceof this.TModel
          ? data
          : this.TModel.prototype instanceof ns.Collection
            ? new this.TModel(data[this.TModel.prototype.itemsProperty], data)
            : new this.TModel(data),
        index = ArrayUtils.indexOf(this.models, model);
    if (index == -1) {
      model
        .on('change', this.onItemEvent, this)
        .on('invalid', this.onItemEvent, this)
        .on('saveSuccess', this.onItemEvent, this)
        .on('saveError', this.onItemEvent, this);
    }
    return model;
  }