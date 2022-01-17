function (entity, property, callback) {
        /// <signature>
        ///     <summary>Loads a property of the entity through the storage provider.</summary>
        ///     <param name="entity" type="$data.Entity">Entity object</param>
        ///     <param name="property" type="String">Property name</param>
        ///     <param name="callback" type="Function">
        ///         <summary>C  allback function</summary>
        ///         <param name="propertyValue" />
        ///     </param>
        ///     <returns type="$.Deferred" />
        /// </signature>
        /// <signature>
        ///     <summary>Loads a property of the entity through the storage provider.</summary>
        ///     <param name="entity" type="$data.Entity">Entity object</param>
        ///     <param name="property" type="String">Property name</param>
        ///     <param name="callbacks" type="Object">
        ///         Success and error callbacks definition.
        ///         Example: [code]{ success: function(db) { .. }, error: function() { .. } }[/code]
        ///     </param>
        ///     <returns type="$.Deferred" />
        /// </signature>
        /// <signature>
        ///     <summary>Loads a property of the entity through the storage provider.</summary>
        ///     <param name="entity" type="$data.Entity">Entity object</param>
        ///     <param name="property" type="MemberDefinition">Property definition</param>
        ///     <param name="callback" type="Function">
        ///         <summary>Callback function</summary>
        ///         <param name="propertyValue" />
        ///     </param>
        ///     <returns type="$.Deferred" />
        /// </signature>
        /// <signature>
        ///     <summary>Loads a property of the entity through the storage provider.</summary>
        ///     <param name="entity" type="$data.Entity">Entity object</param>
        ///     <param name="property" type="MemberDefinition">Property definition</param>
        ///     <param name="callbacks" type="Object">
        ///         Success and error callbacks definition.
        ///         Example: [code]{ success: function(db) { .. }, error: function() { .. } }[/code]
        ///     </param>
        ///     <returns type="$.Deferred" />
        /// </signature>
        Guard.requireType('entity', entity, $data.Entity);

        var memberDefinition = typeof property === 'string' ? entity.getType().memberDefinitions.getMember(property) : property;

        if (entity[memberDefinition.name] != undefined) {
            var pHandler = new $data.PromiseHandler();
            callBack = pHandler.createCallback(callback);
            callback.success(entity[memberDefinition.name]);
            return pHandler.getPromise();
        }

        var isSingleSide = true;
        var storageModel = this._storageModel.getStorageModel(entity.getType().fullName);
        var elementType = Container.resolveType(memberDefinition.dataType);
        if (elementType === $data.Array || (elementType.isAssignableTo && elementType.isAssignableTo($data.EntitySet))) {
            elementType = Container.resolveType(memberDefinition.elementType);

            isSingleSide = false;

        } else {
            var associations = storageModel.Associations.filter(function (assoc) { return assoc.FromPropertyName == memberDefinition.name; })[0];
            if (associations && associations.FromMultiplicity === "0..1" && associations.ToMultiplicity === "1")
                isSingleSide = false;
        }

        if (isSingleSide === true) {
            //singleSide

            var filterFunc = "function (e) { return";
            var filterParams = {};
            storageModel.LogicalType.memberDefinitions.getKeyProperties().forEach(function (memDefKey, index) {
                if (index > 0)
                    filterFunc += ' &&';
                filterFunc += " e." + memDefKey.name + " == this.key" + index;
                filterParams['key' + index] = entity[memDefKey.name];
            });
            filterFunc += "; }"

            return storageModel.EntitySetReference
                .map('function (e) { return e.' + memberDefinition.name + ' }')
                .single(filterFunc, filterParams, callback);
        } else {
            //multipleSide

            var filterFunc = "function (e) { return"
            var filterParams = {};
            storageModel.LogicalType.memberDefinitions.getKeyProperties().forEach(function (memDefKey, index) {
                if (index > 0)
                    filterFunc += ' &&';
                filterFunc += " e." + memberDefinition.inverseProperty + "." + memDefKey.name + " == this.key" + index;
                filterParams['key' + index] = entity[memDefKey.name];
            });
            filterFunc += "; }"

            var entitySet = this.getEntitySetFromElementType(elementType);
            return entitySet
                .filter(filterFunc, filterParams)
                .toArray(callback);
        }

    }