function(data) {
        if(typeof data == "string") { 
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var schema = {};
        if (data.nodeName.split(":").pop() === 'ExceptionReport') {
            // an exception must have occurred, so parse it
            var parser = new OpenLayers.Format.OGCExceptionReport();
            schema.error = parser.read(data);
        } else {
            this.readNode(data, schema);
        }
        return schema;
    }