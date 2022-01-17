function() {
    var multiAssociation = this.target.associations.hasOwnProperty(this.associationAccessor)
    this.identifier = this.options.foreignKey || Utils._.underscoredIf(Utils.singularize(this.source.tableName) + "Id", this.options.underscored)

    // is there already a single sided association between the source and the target?
    // or is the association on the model itself?
    if ((this.isSelfAssociation && this.useJunctionTable) || multiAssociation) {
      // remove the obsolete association identifier from the source
      if(this.isSelfAssociation) {
        this.foreignIdentifier = Utils._.underscoredIf((this.options.as || this.target.tableName) + 'Id', this.options.underscored)
      } else {
        this.foreignIdentifier = this.target.associations[this.associationAccessor].identifier
        delete this.source.attributes[this.foreignIdentifier]
      }

      // define a new model, which connects the models
      var combinedTableAttributes = {}
      combinedTableAttributes[this.identifier] = {type:DataTypes.INTEGER, primaryKey: true}
      combinedTableAttributes[this.foreignIdentifier] = {type:DataTypes.INTEGER, primaryKey: true}

      this.connectorDAO = this.source.daoFactoryManager.sequelize.define(this.combinedName, combinedTableAttributes, this.options)
      if(!this.isSelfAssociation) this.target.associations[this.associationAccessor].connectorDAO = this.connectorDAO

      if(this.options.syncOnAssociation) {
        this.connectorDAO.sync()
      }
    } else {
      var newAttributes = {}
      newAttributes[this.identifier] = { type: DataTypes.INTEGER }
      Utils._.extend(this.target.rawAttributes, newAttributes)
    }

    return this
  }