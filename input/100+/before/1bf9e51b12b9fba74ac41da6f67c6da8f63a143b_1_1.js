function () {
  var join;
  if (typeof (arguments[0]) === 'string') {
    var associationPropertyName = arguments[0];
    var association = this.model.associations[associationPropertyName];
    if (!association) {
      throw new Error('Could not find association "' + associationPropertyName + '" off of "' + this.model.modelName + '"');
    }

    // join to table
    if (association.through) {
      // otherTable, otherTableId, thisTableId
      this.leftJoin(association.through, association.foreignKey, this.model.getIdColumn().dbColumnName);
      join = this._sqlTree().joins[this._sqlTree().joins.length - 1];
      this.leftJoin(association.model.tableName, association.model.getIdColumn().dbColumnName, {tableAlias: join.tableAlias, dbColumnName: association.manyToManyForeignKey});
    } else {
      this.leftJoin(associationPropertyName);
    }

    // add the columns from the new table
    join = this._sqlTree().joins[this._sqlTree().joins.length - 1];
    var primaryKeyColumn;
    var propertyName;
    for (propertyName in association.model.columns) {
      var col = association.model.columns[propertyName];
      var colDef = this._sqlTree().addColumn(association.model, propertyName, join.tableAlias);
      if (col.primaryKey) {
        primaryKeyColumn = colDef;
      }
    }

    // add the include
    this._sqlTree().includes.push({ propertyName: arguments[0], association: association, primaryKeyColumn: primaryKeyColumn });

  } else if (Array.isArray(arguments[0])) {
    var arr = arguments[0];
    var i;
    for (i = 0; i < arr.length; i++) {
      this.include(arr[i]);
    }
  } else {
    throw new Error("Include expects a property name or an array of property names.");
  }
  return this;
}