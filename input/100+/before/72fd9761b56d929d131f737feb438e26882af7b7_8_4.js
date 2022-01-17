function (particle, newPosition) {
        // colors
        var quad = this._quads[this._particleIdx];

        var color = new cc.Color4B((particle.color.r * 255), (particle.color.g * 255), (particle.color.b * 255),
            (particle.color.a * 255));
        quad.bl.colors = color;
        quad.br.colors = color;
        quad.tl.colors = color;
        quad.tr.colors = color;

        // vertices
        var size_2 = particle.size / 2;
        if (particle.rotation) {
            var x1 = -size_2;
            var y1 = -size_2;

            var x2 = size_2;
            var y2 = size_2;
            var x = newPosition.x;
            var y = newPosition.y;

            var r = -cc.DEGREES_TO_RADIANS(particle.rotation);
            var cr = Math.cos(r);
            var sr = Math.sin(r);
            var ax = x1 * cr - y1 * sr + x;
            var ay = x1 * sr + y1 * cr + y;
            var bx = x2 * cr - y1 * sr + x;
            var by = x2 * sr + y1 * cr + y;
            var cx = x2 * cr - y2 * sr + x;
            var cy = x2 * sr + y2 * cr + y;
            var dx = x1 * cr - y2 * sr + x;
            var dy = x1 * sr + y2 * cr + y;

            // bottom-left
            quad.bl.vertices.x = ax;
            quad.bl.vertices.y = ay;

            // bottom-right vertex:
            quad.br.vertices.x = bx;
            quad.br.vertices.y = by;

            // top-left vertex:
            quad.tl.vertices.x = dx;
            quad.tl.vertices.y = dy;

            // top-right vertex:
            quad.tr.vertices.x = cx;
            quad.tr.vertices.y = cy;
        } else {
            // bottom-left vertex:
            quad.bl.vertices.x = newPosition.x - size_2;
            quad.bl.vertices.y = newPosition.y - size_2;

            // bottom-right vertex:
            quad.br.vertices.x = newPosition.x + size_2;
            quad.br.vertices.y = newPosition.y - size_2;

            // top-left vertex:
            quad.tl.vertices.x = newPosition.x - size_2;
            quad.tl.vertices.y = newPosition.y + size_2;

            // top-right vertex:
            quad.tr.vertices.x = newPosition.x + size_2;
            quad.tr.vertices.y = newPosition.y + size_2;
        }
    }