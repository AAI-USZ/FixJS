function (result, item, include) {
    var i;
    var includeItems = [];
    if (!include.primaryKeyColumn) {
      throw new Error('Include "' + include.propertyName + '" does not have a single primary key defined.');
    }
    var groups = persistUtil.groupBy(item, include.primaryKeyColumn.alias);
    for (i = 0; i < groups.length; i++) {
      var includeItem = groups[i][0];
      var includeItemInstance = new include.association.model();
      includeItemInstance = this.toObject(includeItem, includeItemInstance);

      // there could be no children, in this case the child columns will all be null
      if (includeItemInstance.getId() !== null) {
        includeItems.push(includeItemInstance);
      }
    }
    delete result[include.propertyName];
    if (include.association.type === 'hasOne') {
      result[include.propertyName] = includeItems[0];
    } else {
      result[include.propertyName] = includeItems;
    }
  }