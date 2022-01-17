function (elementType, context, collectionName) {
        /// <signature>
        ///     <summary>Represents a typed entity set that is used to perform create, read, update, and delete operations</summary>
        ///     <param name="elementType" type="Function" subClassOf="$data.Entity">Type of entity set elements, elementType must be subclass of $data.Entity</param>
        ///     <param name="context" type="$data.EntityContext">Context of the EntitySet</param>
        ///     <param name="collectionName" type="String">Name of the EntitySet</param>
        /// </signature>
        this.createNew = this[elementType.name] = elementType;
        this.stateManager = new $data.EntityStateManager(this);
        Object.defineProperty(this, "elementType", { value: elementType, enumerable: true });
        Object.defineProperty(this, "collectionName", { value: collectionName, enumerable: true });

        this._checkRootExpression();
    }