f
    function ContainerCtor() {

        var classNames = {};
        var consolidatedClassNames = [];
        var classTypes = [];

        this.classNames = classNames;
        this.consolidatedClassNames = consolidatedClassNames;
        this.classTypes = classTypes;

        var mappedTo = [];
        this.mappedTo = mappedTo;

        var self = this;

        this["holder"] = null;

        var IoC = function (type, parameters) {
            var t = self.resolveType(type);
            var inst = Object.create(t.prototype);
            t.apply(inst, parameters);
            return inst;
        };

        this.mapType = function (aliasTypeOrName, realTypeOrName) {
            Guard.requireValue("aliasType", aliasTypeOrName);
            Guard.requireValue("realType", realTypeOrName);
            var aliasT = this.getType(aliasTypeOrName);
            var realT = this.getType(realTypeOrName);
            var aliasPos = classTypes.indexOf(aliasT);
            var realPos = classTypes.indexOf(realT);
            mappedTo[aliasPos] = realPos;
        },

        this.resolve = function (type, parameters) {
            var classFunction = this.resolveType(type, parameters);
            return new classFunction(parameters);
        };

        this.resolveName = function (type) {
            var t = this.resolveType(type);
            var tPos = classTypes.indexOf(t);
            return consolidatedClassNames[tPos];
        };

        this.isPrimitiveType = function(type) {
            var t = this.resolveType(type);
            return t === Number || t === String || t === Date || t === String || t === Boolean || t === Array || t === Object ||
                t === $data.Number || t === $data.String || t === $data.Date || t === $data.String || t === $data.Boolean || t === $data.Array || t === $data.Object;
        };

        this.resolveType = function (typeOrName) {
            var t = typeOrName;
            t = this.getType(t);
            var posT = classTypes.indexOf(t);
			return typeof mappedTo[posT] === 'undefined' ? t : classTypes[mappedTo[posT]];
        };

        this.getTypes = function () {
            return Object.keys(classNames).map(function (className, index) {
                return { name: className, type: classTypes[classNames[className]], toString: function () { return this.name; } };
            });
        };

        //this.getTypeName( in type);
        //this.resolveType()
        //this.inferTypeFromValue = function (value) {

        this.getTypeName = function (value) {
            switch (typeof value) {
                case 'object':
                    if (value == null) return '$data.Object';
                    if (value instanceof Array) return '$data.Array';
                    if (value.getType) return value.getType().fullName;
                    if (value instanceof Date) return '$data.Date';
                    //if(value instanceof "number") return
                default:
                    return typeof value;
            }
        };

        this.isTypeRegistered = function (typeOrName) {
            if (typeof typeOrName === 'function') {
                return classTypes.indexOf(typeOrName) > -1;
            } else {
                return typeOrName in classNames;
            }
        };

        this.unregisterType = function (type) {
            Guard.raise("Unimplemented");
        };

        this.getType = function (typeOrName) {
            Guard.requireValue("typeOrName", typeOrName);
            if (typeof typeOrName === 'function') {
                return typeOrName;
            };

            if (!(typeOrName in classNames)) {
                Guard.raise(new Exception("Unable to resolve type:" + typeOrName));
            };
            return classTypes[classNames[typeOrName]];
        };

        this.getName = function (typeOrName) {
            var t = this.getType(typeOrName);
            var tPos = classTypes.indexOf(t);
            if (tPos == -1)
                Guard.raise("unknown type to request name for: " + typeOrName);
            return consolidatedClassNames[tPos];
        };

		this.getDefault = function (typeOrName) {
			var t = this.resolveType(typeOrName);
			switch (t){
				case $data.Number: return 0.0;
				case $data.Integer: return 0;
				case $data.String: return '';
				case $data.Boolean: return false;
				default: return null;
			}
		};

        //name array ['', '', '']
        this.registerType = function(nameOrNamesArray, type, factoryFunc) {
            ///<signature>
            ///<summary>Registers a type and optionally a lifetimeManager with a name
            ///that can be used to later resolve the type or create new instances</summary>
            ///<param name="nameOrNamesArray" type="Array">The names of the type</param>
            ///<param name="type" type="Function">The type to register</param>
            ///<param name="instanceManager" type="Function"></param>
            ///</signature>
            ///<signature>
            ///<summary>Registers a new type that </summary>
            ///<param name="aliasType" type="Function">The name of the type</param>
            ///<param name="actualType" type="Function">The type to register</param>
            ///</signature>


            ///TODO remove
            /*if (typeof typeNameOrAlias === 'string') {
                if (classNames.indexOf(typeNameOrAlias) > -1) {
                    Guard.raise("Type already registered. Remove first");
                }
            }*/

            if (!nameOrNamesArray) {
                return;
            }

            //todo add ('number', 'number')
            if (typeof type === "string") {
                type = self.resolveType(type);
            }

            if (typeof nameOrNamesArray === 'string') {
                var tmp = [];
                tmp.push(nameOrNamesArray);
                nameOrNamesArray = tmp;
            }

            for (var i = 0; i < nameOrNamesArray.length; i++) {
                var parts = nameOrNamesArray[i].split('.');
                var item = {};
                item.shortName = parts[parts.length - 1];
                item.fullName = nameOrNamesArray[i];
                nameOrNamesArray[i] = item;
            }

            //if (type.


            var creatorFnc = function () { return IoC(type, arguments); };

            if (typeof intellisense !== 'undefined') {
                intellisense.annotate(creatorFnc, type);
            }

            for (var i = 0, l = nameOrNamesArray.length; i < l; i++) {
                var item = nameOrNamesArray[i];
                if (!(("create" + item.shortName) in self)) {
                    if (typeof factoryFunc === 'function') {
                        self["create" + item.shortName] = factoryFunc;
                    } else {
                        self["create" + item.shortName] = creatorFnc;
                    }
                } else {
                    if (console) { console.warn("warning: short names overlap:" + item.shortName + ", Container.create" + item.shortName + " has not been updated"); }
                };

                var typePos = classTypes.indexOf(type);
                if (typePos == -1) {
                    //new type
                    typePos = classTypes.push(type) - 1;
                    var fn = item.fullName;
                    consolidatedClassNames[typePos] = item.fullName;
                };

                if (item.fullName in classNames) {
                    console.warn("warning:!!! This typename has already been registered:" + item.fullName);
                };
                classNames[item.fullName] = typePos;
            }

			if (!type.name){
				type.name = nameOrNamesArray[0].shortName;
			}
        };
    }

    $data.Number = typeof Number !== 'undefined' ? Number : function JayNumber() { };
    $data.Integer = typeof Integer !== 'undefined' ? Integer : function JayInteger() {  };
    $data.Date = typeof Date !== 'undefined' ? Date : function JayDate() { };
    $data.String = typeof String !== 'undefined' ? String : function JayString() { };
    $data.Boolean = typeof Boolean !== 'undefined' ? Boolean : function JayBoolean() { };
    $data.Blob = /*typeof Blob !== 'undefined' ? Blob :*/ function JayBlob() { };
    $data.Array = typeof Array !== 'undefined' ? Array : function JayArray() { };
    $data.Object = typeof Object !== 'undefined' ? Object : function JayObject() { };
    $data.Function = Function;

    var c;
    global["Container"] = $data.Container = c = global["C$"] = new ContainerCtor();
    c.registerType(["$data.Number", "number", "float", "real", "decimal"], $data.Number);
    c.registerType(["$data.Integer", "int", "integer", "int16", "int32", "int64"], $data.Integer);
    c.registerType(["$data.String", "string", "text", "character"], $data.String);
    c.registerType(["$data.Array", "array", "Array", "[]"], $data.Array, function () {
        return $data.Array.apply(undefined, arguments);
    });
    c.registerType(["$data.Date", "datetime", "date"], $data.Date);
    c.registerType(["$data.Boolean", "bool", "boolean"], $data.Boolean);
    c.registerType(["$data.Blob", "blob"], $data.Blob);
    c.registerType(["$data.Object", "Object", "object"], $data.Object);
    c.registerType(["$data.Function", "Function", "function"], $data.Function);


})(window);
