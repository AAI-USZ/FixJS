function(data) {
    var model = data instanceof this.TModel ? data : new this.TModel(data),
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