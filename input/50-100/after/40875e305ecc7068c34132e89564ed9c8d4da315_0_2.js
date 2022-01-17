function(f,m){
      
        var verts = [];
        for(var i = 0; i < f.verticies.length; i++){
           
            verts[i] = m.applyTransform(f.verticies[i]);
        }
        return new POS3D.Face(verts,f.color);
    }