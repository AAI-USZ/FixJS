function() {
    var ba = {
        "Array": {
            "Uint16Array" : {
                "File": "stream.bin",
                "Size": 3
            }
        }, 
        "ItemSize": 3, 
        "Type": "ARRAY_BUFFER",
        "UniqueID" : 10
    };
    var input = new osgDB.Input(ba);
    osgDB.Promise.when(input.readBufferArray()).then(function(buffer) {
        ok(buffer.getElements()[2] === 10, "readBufferArray with new array typed external file");
        start();
    });
}