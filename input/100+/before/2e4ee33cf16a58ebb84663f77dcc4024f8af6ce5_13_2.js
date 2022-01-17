function() {
        stop();
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
        input.readBufferArrayCallback = function(type, buffer) {
            return function(array) {
                var a = new osg[type](array);
                buffer.setElements(a);

                ok(buffer.getElements()[2] === 10, "readBufferArray with new array typed external file");
                start();
            };
        };
        var o = input.readBufferArray();

    }