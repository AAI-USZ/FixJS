function Matrix_rotate(radians, vec3d) {
            // If no vector is given, rotate about z.
            vec3d = vec3d || new Vector(0, 0, 1);
            var x = vec3d[0];
            var y = vec3d[1];
            var z = vec3d[2];
            var cos = Math.cos;
            var sin = Math.sin;
            var rotation = new Transform3d(
                cos(y)*cos(z), -cos(x)*sin(z)+sin(x)*sin(y)*sin(z),  sin(x)*sin(z) + cos(x)*sin(y)*cos(z), 0,
                cos(y)*sin(z),  cos(x)*cos(z)+sin(x)*sin(y)*sin(z), -sin(x)*cos(z) + cos(x)*sin(y)*sin(z), 0,
                      -sin(y),                       sin(x)*cos(y),                         cos(x)*cos(y), 0,
                            0,                                   0,                                     0, 1 
            );
            return this.multiply(rotation);
        }