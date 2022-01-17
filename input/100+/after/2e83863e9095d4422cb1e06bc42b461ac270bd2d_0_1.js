function(data) {
        if(typeof data == "string") { 
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var schema = {};
        this.readNode(data, schema);
        if (schema.version === undefined) {
            // an exception must have occurred, so parse it
            var parser = new OpenLayers.Format.OGCExceptionReport();
            schema.error = parser.read(data);
        }
        return schema;
    }