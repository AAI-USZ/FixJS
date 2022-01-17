function(mod,m){
        var nFaces = [];
        for (var i = 0; i < mod.faces.length; i++)
            nFaces[i] = mod.faces[i].applyTransform(m)
        return new POS3D.Model(mod.vector,nFaces);  
    }