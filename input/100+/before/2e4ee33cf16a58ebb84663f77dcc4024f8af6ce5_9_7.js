function(input, node) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        if (o.PrimitiveSetList !== undefined && o.VertexAttributeList !== undefined) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Node(input, node);

    for (var i = 0, l = jsonObj.PrimitiveSetList.length; i < l; i++) {
        var entry = jsonObj.PrimitiveSetList[i];
        var primitiveSet = input.setJSON(entry).readPrimitiveSet();
        if (primitiveSet) {
            node.getPrimitives().push(primitiveSet);
        }
    }
    for (var key in jsonObj.VertexAttributeList) {
        if (jsonObj.VertexAttributeList.hasOwnProperty(key)) {
            var attributeArray = jsonObj.VertexAttributeList[key];
            var ba = input.setJSON(attributeArray).readBufferArray();
            if (ba !== undefined) {
                node.getVertexAttributeList()[key] = ba;
            }
        }
    }
}