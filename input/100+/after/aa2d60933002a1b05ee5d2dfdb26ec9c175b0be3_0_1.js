function(srcDAO, targetDAO, options) {
    this.source = srcDAO
    this.target = targetDAO
    this.options = options
    this.useJunctionTable = this.options.useJunctionTable === undefined ? true : this.options.useJunctionTable
    this.isSelfAssociation = (this.source.tableName === this.target.tableName)

    var combinedTableName = Utils.combineTableNames(
      this.source.tableName,
      this.isSelfAssociation ? (this.options.as || this.target.tableName) : this.target.tableName
    )
    this.associationAccessor = this.combinedName = (this.options.joinTableName || combinedTableName)

    var as = (this.options.as || Utils.pluralize(this.target.tableName))

    this.accessors = {
      get: Utils._.camelize('get_' + as),
      set: Utils._.camelize('set_' + as),
      add: Utils._.camelize(Utils.singularize('add_' + as)),
      remove: Utils._.camelize(Utils.singularize('remove_' + as)),
      hasSingle: Utils._.camelize(Utils.singularize('has_' + as)),
      hasAll: Utils._.camelize('has_' + as)
    }
  }