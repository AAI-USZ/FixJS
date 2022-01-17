function (associatedModel, opts) {
    opts = this.normalizeHasManyOptions(associatedModel, opts);
    if(!associatedModel || !associatedModel.modelName) {
      throw new Error("Could not find associated model");
    }
    var name = opts.name || inflection.camelize(inflection.pluralize(associatedModel.modelName), true);
    if (this.associations[name]) {
      return this;
    }
    this.associations[name] = opts;

    if (opts.through) {
      opts.manyToManyForeignKey = opts.manyToManyForeignKey || inflection.foreignKey(associatedModel.modelName);
      var associatedOpts = persistUtil.shallowCopy(opts);
      delete associatedOpts.manyToManyForeignKey;
      delete associatedOpts.foreignKey;
      associatedModel.hasMany(this, associatedOpts);
    } else {
      associatedModel.hasOne(this);
    }

    return this;
  }