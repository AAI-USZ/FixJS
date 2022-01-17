function() {
        var obj = { "osg.Material": {
            "UniqueID" : 10,
            "Name": "FloorBorder1", 
            "Ambient": [ 0.5, 0.5, 0.5, 1], 
            "Diffuse": [ 0.1, 0.1, 0.1, 0.1], 
            "Emission": [ 0, 0, 0, 0.5], 
            "Shininess": 2.5, 
            "Specular": [ 0.5, 0.7, 0.5, 1]
        } };
        var input = new osgDB.Input(obj);
        var o = input.readObject();
        var o2 = input.setJSON( { "osg.Material" : { "UniqueID": 10 } }).readObject();
        ok(o2.getName() === "FloorBorder1", "readObject check same unique id");
    }