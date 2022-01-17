function (callback) {
        /// <signature>
        ///     <summary>
        ///         Saves the changes made to the context.
        ///     </summary>
        ///     <param name="successCallback" type="Function">
        ///         <summary>Success callback</summary>
        ///         <param name="entityContext" type="$data.EntityContext">Current entityContext object</param>
        ///     </param>
        ///     <returns type="$.Deferred" />
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Saves the changes made to the context.
        ///     </summary>
        ///     <param name="callbacks" type="Object">
        ///         Success and error callbacks definition.
        ///         Example: [code]{ success: function(db) { .. }, error: function() { .. } }[/code]
        ///     </param>
        ///     <returns type="$.Deferred" />
        /// </signature>
        var changedEntities = [];
        var trackedEntities = this.stateManager.trackedEntities;
        var pHandler = new $data.PromiseHandler();
        var clbWrapper = pHandler.createCallback(callback);
        var pHandlerResult = pHandler.getPromise();

        var skipItems = [];
        while (trackedEntities.length > 0) {
            var additionalEntities = [];
            trackedEntities.forEach(function (entityCachedItem) {
                var sModel = this._storageModel.getStorageModel(entityCachedItem.data.getType());
                if (entityCachedItem.data.entityState == $data.EntityState.Unchanged) {
                    entityCachedItem.skipSave = true;
                    skipItems.push(entityCachedItem.data);
                } else {
                    if (entityCachedItem.data.entityState == $data.EntityState.Modified) {
                        if (entityCachedItem.data.changedProperties) {
                            var changeStoredProperty = entityCachedItem.data.changedProperties.some(function (p) {
                                var pMemDef = sModel.PhysicalType.memberDefinitions.getMember(p.name);
                                if (pMemDef.kind == $data.MemberTypes.navProperty) {
                                    var a = sModel.Associations[pMemDef.association];
                                    var multiplicity = a.FromMultiplicity + a.ToMultiplicity;
                                    return ((multiplicity == '*0..1') || (multiplicity == '0..11'))
                                }
                                return true;
                            });
                            if (!changeStoredProperty) {
                                entityCachedItem.skipSave = true;
                                skipItems.push(entityCachedItem.data);
                            }
                        }
                    }
                }

                var navigationProperties = sModel.PhysicalType.memberDefinitions.asArray().filter(function (p) { return p.kind == $data.MemberTypes.navProperty; });
                navigationProperties.forEach(function (navProp) {
                    var association = sModel.Associations[navProp.name]; //eg.:"Profile"
                    var name = navProp.name; //eg.: "Profile"
                    var navPropertyName = association.ToPropertyName; //eg.: User

                    var connectedDataList = [].concat(entityCachedItem.data[name]);
                    connectedDataList.forEach(function (data) {
                        if (data) {
                            var value = data[navPropertyName];
                            var associationType = association.FromMultiplicity + association.ToMultiplicity;
                            if (association.FromMultiplicity === '$$unbound') {
                                if (data instanceof $data.Array) {
                                    entityCachedItem.dependentOn = entityCachedItem.dependentOn || [];
                                    data.forEach(function (dataItem) {
                                        if ((entityCachedItem.dependentOn.indexOf(data) < 0) && (data.skipSave !== true)) {
                                            entityCachedItem.dependentOn.push(data);
                                        }
                                    }, this);
                                } else {
                                    entityCachedItem.dependentOn = entityCachedItem.dependentOn || [];
                                    if ((entityCachedItem.dependentOn.indexOf(data) < 0) && (data.skipSave !== true)) {
                                        entityCachedItem.dependentOn.push(data);
                                    }
                                }
                            } else {
                                switch (associationType) {
                                    case "*0..1": //Array
                                        if (value) {
                                            if (value instanceof Array) {
                                                if (value.indexOf(entityCachedItem.data) == -1) {
                                                    value.push(entityCachedItem.data);
                                                }
                                            } else {
                                                if (typeof intellisense === 'undefined') {
                                                    Guard.raise("Item must be array or subtype of array");
                                                }
                                            }
                                        } else {
                                            data[navPropertyName] = [entityCachedItem.data];
                                        }
                                        break;
                                    default: //Item
                                        if (value) {
                                            if (value !== entityCachedItem.data) {
                                                if (typeof intellisense === 'undefined') {
                                                    Guard.raise("Integrity check error! Item assigned to another entity!");
                                                }
                                            }
                                        } else {
                                            data[navPropertyName] = entityCachedItem.data; //set back reference for live object
                                        }
                                        break;
                                }
                                switch (associationType) {
                                    case "*0..1":
                                    case "0..11":
                                        entityCachedItem.dependentOn = entityCachedItem.dependentOn || [];
                                        if ((entityCachedItem.dependentOn.indexOf(data) < 0) && (data.skipSave !== true)) {
                                            entityCachedItem.dependentOn.push(data);
                                        }
                                        break;
                                }
                            }
                            if (!data.entityState) {
                                data.entityState = $data.EntityState.Added;
                            }
                            if (additionalEntities.indexOf(data) == -1) {
                                additionalEntities.push(data);
                            }
                        }
                    }, this);
                }, this);
            }, this);

            trackedEntities.forEach(function (entity) {
                if (entity.skipSave !== true) { changedEntities.push(entity); }
            });

            trackedEntities = [];
            additionalEntities.forEach(function (item) {
                if (!skipItems.some(function (entity) { return entity == item; })) {
                    if (!changedEntities.some(function (entity) { return entity.data == item; })) {
                        trackedEntities.push({ data: item, entitySet: this.getEntitySetFromElementType(item.getType().name) });
                    }
                }
            }, this);
        }


        changedEntities.forEach(function (d) {
            if (d.dependentOn) {
                var temp = [];
                for (var i = 0; i < d.dependentOn.length; i++) {
                    if (skipItems.indexOf(d.dependentOn[i]) < 0) {
                        temp.push(d.dependentOn[i]);
                    }
                }
                d.dependentOn = temp;
            }
        });
        skipItems = null;
        var ctx = this;
        if (changedEntities.length == 0) { clbWrapper.success(); return pHandlerResult; }

        //validate entities
        var errors = [];
        changedEntities.forEach(function (entity) {
            if (entity.data.entityState === $data.EntityState.Added) {
                entity.data.getType().memberDefinitions.getPublicMappedProperties().forEach(function (memDef) {
                    if (memDef.required && !memDef.computed && !entity.data[memDef.name]) entity.data[memDef.name] = Container.getDefault(memDef.dataType);
                }, this);
            }
            if ((entity.data.entityState != $data.EntityState.Added || entity.data.entityState != $data.EntityState.Modified)
                && !entity.data.isValid()) {
                errors.push({ item: entity.data, errors: entity.data.ValidationErrors });
            }
        });
        if (errors.length > 0) {
            clbWrapper.error(errors);
            return pHandlerResult;
        }

        this.storageProvider.saveChanges({
            success: function () {
                ctx._postProcessSavedItems(clbWrapper, changedEntities);
            }, error: clbWrapper.error
        }, changedEntities);
        return pHandlerResult;
    }