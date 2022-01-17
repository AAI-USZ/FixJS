function(mod){
         
        var nFaces = [];
        for (var i = 0; i < mod.faces.length; i++)
            nFaces[i] = POS3D.Face.applyTransform(mod.faces[i],mod.transform);

        return new POS3D.Model(mod.vector,nFaces);  
    }