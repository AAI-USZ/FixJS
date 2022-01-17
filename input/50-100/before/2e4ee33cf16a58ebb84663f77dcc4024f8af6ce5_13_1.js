function() {
        var ba = {
            "Array": {
                "Uint16Array" : {
                    "Elements" : [ 0.01727, -0.00262, 3.0],
                    "Size": 3
                }
            }, 
            "ItemSize": 3, 
            "Type": "ARRAY_BUFFER",
            "UniqueID" : 10
        };
        var input = new osgDB.Input(ba);
        var o = input.readBufferArray();
        var o2 = input.setJSON({ 
            "UniqueID" : 10
        }).readBufferArray();
        ok(o2.getElements()[2] === 3.0, "readBufferArray with new array typed inlined");
    }