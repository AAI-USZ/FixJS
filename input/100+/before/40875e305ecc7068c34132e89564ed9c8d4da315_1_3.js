function(m,v){
        var x = (v.x * m.matrix[0][0]) + (v.y * m.matrix[0][1]) + (v.z * m.matrix[0][2]) + (m.matrix[0][3]);
        var y = (v.x * m.matrix[1][0]) + (v.y * m.matrix[1][1]) + (v.z * m.matrix[1][2]) + (m.matrix[1][3]);
        var z = (v.x * m.matrix[2][0]) + (v.y * m.matrix[2][1]) + (v.z *m.matrix[2][2]) + (m.matrix[2][3]);

        return new POS3D.Vector(x, y, z);   
    }