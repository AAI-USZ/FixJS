function (a, b, t) {
                if (t == 1) return to;
                var s = t * S,
                    us = u(s),
                    z = a.zoom + (Math.log(w0/w(s)) / Math.LN2),
                    x = interp(c0.x, c1.x, us/u1 || 1),
                    y = interp(c0.y, c1.y, us/u1 || 1);
                return new MM.Coordinate(y, x, 0).zoomTo(z);
            }