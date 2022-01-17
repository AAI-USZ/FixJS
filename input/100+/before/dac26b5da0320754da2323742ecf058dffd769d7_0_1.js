function (initData) {
        /// <description>
        ///     This class provide a light weight, object-relational interface between 
        ///     your javascript code and database.
        /// </description>
        ///
        /// <signature>
        ///     <param name="initData" type="Object">initialization data</param>
        ///     <example>
        ///         var category = new $news.Types.Category({ Title: 'Tech' });
        ///         $news.context.Categories.add(category);
        ///     </example>
        /// </signature>
        ///
        /// <field name="initData" type="Object">initialization data</field>
        /// <field name="context" type="$data.EntityContext"></field>
        /// <field name="propertyChanging" type="$data.Event"></field>
        /// <field name="propertyChanged" type="$data.Event"></field>
        /// <field name="propertyValidationError" type="$data.Event"></field>
        /// <field name="isValidated" type="Boolean">Determines the current $data.Entity is validated.</field>
        /// <field name="ValidationErrors" type="Array">array of $data.Validation.ValidationError</field>
        /// <field name="ValidationErrors" type="Array">array of MemberDefinition</field>
        /// <field name="entityState" type="Integer"></field>
        /// <field name="changedProperties" type="Array">array of MemberDefinition</field>

        //this.initData = {};
        if (this.getType().__copyPropertiesToInstance) {
            $data.typeSystem.writePropertyValues(this);
        }

        Object.defineProperty(this, 'initData', { enumerable: false, configurable: true, writable: true, value: {} });
        var ctx = null;
        Object.defineProperty(this, 'context', { enumerable: false, configurable: false, get: function () { return ctx; }, set: function (value) { ctx = value; } });
        if (arguments.length == 1 && typeof initData === "object") {
            var typeMemDefs = this.getType().memberDefinitions;
            var memDefNames = typeMemDefs.getPublicMappedPropertyNames();//.map(function (memDef) { return memDef.name; });
            /*if (Object.keys(initData).every(function (key) { return memDefNames.indexOf(key) != -1; })) {
                this.initData = initData;
            }*/
            
            for (var i in initData){
                if (memDefNames.indexOf(i) > -1){
                    this[i] = Container.resolveType(typeMemDefs.getMember(i).type) === $data.Date && typeof initData[i] === 'string' ? new Date(initData[i]) : initData[i];
                }
            }
        }
    }