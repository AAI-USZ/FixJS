function(f,m){
        var verts = [];
        for(var i = 0; i < f.verticies.length; i++){
           
            verts[i] = POS3D.Matrix.applyTransform(m,f.verticies);
        }
        return new POS3D.Face(verts,f.color);
    }