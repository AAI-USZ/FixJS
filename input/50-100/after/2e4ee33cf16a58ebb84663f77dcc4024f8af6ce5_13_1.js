function(value) {
        return input.setJSON({ "DrawArrays" : { 
            "UniqueID" : 10
        }}).readPrimitiveSet();
    }