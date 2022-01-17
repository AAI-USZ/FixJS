function () {

        var jsonObj = this.getJSON();
        var prop = Object.keys(jsonObj)[0];
        if (!prop) {
            osg.warn("can't find property for object " + jsonObj);
            return undefined;
        }

        var uniqueID = jsonObj[prop].UniqueID;
        var osgjsObject;
        if (uniqueID !== undefined) {
            osgjsObject = this._identifierMap[uniqueID];
            if (osgjsObject !== undefined) {
                return osgjsObject;
            }
        }

        var obj = this.getObjectWrapper(prop);
        if (!obj) {
            osg.warn("can't instanciate object " + prop);
            return undefined;
        }

        var scope = osgDB.ObjectWrapper.serializers;
        var splittedPath = prop.split('.');
        for (var i = 0, l = splittedPath.length; i < l; i++) {
            var reader = scope[ splittedPath[i] ];
            if (reader === undefined) {
                osg.warn("can't find function to read object " + prop + " - undefined");
                return undefined;
            }
            scope = reader;
        }
        
        var promise = scope(this.setJSON(jsonObj[prop]), obj);

        if (uniqueID !== undefined) {
            this._identifierMap[uniqueID] = obj;
        }
        return promise;
    }