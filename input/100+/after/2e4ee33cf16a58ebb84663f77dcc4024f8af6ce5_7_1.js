function() {
        var jsonObj = this.getJSON();

        var uniqueID = jsonObj.UniqueID;
        var osgjsObject;
        if (uniqueID !== undefined) {
            osgjsObject = this._identifierMap[uniqueID];
            if (osgjsObject !== undefined) {
                return osgjsObject;
            }
        }

        var check = function(o) {
            if ((o.Elements !== undefined || o.Array !== undefined) && 
                o.ItemSize !== undefined &&
                o.Type) {
                return true;
            }
            return false;
        };

        if (!check(jsonObj)) {
            return;
        }

        var obj, defer;

        // inline array
        if (jsonObj.Elements !== undefined) {
            obj = new osg.BufferArray(osg.BufferArray[jsonObj.Type], jsonObj.Elements, jsonObj.ItemSize );

        } else if (jsonObj.Array !== undefined) {

            var buf = new osg.BufferArray(osg.BufferArray[jsonObj.Type]);
            buf.setItemSize(jsonObj.ItemSize);
            
            var vb, type;
            if (jsonObj.Array.Float32Array !== undefined) {
                vb = jsonObj.Array.Float32Array;
                type = 'Float32Array';
            } else if (jsonObj.Array.Uint16Array !== undefined) {
                vb = jsonObj.Array.Uint16Array;
                type = 'Uint16Array';
            } else {
                osg.warn("Typed Array " + Object.keys(o.Array)[0]);
                type = 'Float32Array';
            }

            if (vb !== undefined) {
                if (vb.File !== undefined) {
                    var url = vb.File;
                    defer = osgDB.Promise.defer();
                    osgDB.Promise.when(this.readBinaryArrayURL(url)).then(function(array) {
                        var a = new osg[type](array);
                        buf.setElements(a);

                        defer.resolve(buf);
                    });
                } else if (vb.Elements !== undefined) {
                    var a = new osg[type](vb.Elements);
                    buf.setElements(a);
                }
            }
            obj = buf;
        }
        
        if (uniqueID !== undefined) {
            this._identifierMap[uniqueID] = obj;
        }

        if (defer !== undefined) {
            return defer.promise;
        }
        return obj;
    }