function(boundingBox) {
        var vertexArray = this.getAttributes().Vertex;

        if ( vertexArray && vertexArray.getItemSize() > 2 ) {
            var v = [0,0,0];
            vertexes = vertexArray.getElements();
            for (var idx = 0, l = vertexes.length; idx < l; idx+=3) {
                v[0] = vertexes[idx];
                v[1] = vertexes[idx+1];
                v[2] = vertexes[idx+2];
                boundingBox.expandByVec3(v);
            }
        }
        return boundingBox;
    }