function () {

            // canvas pre-rendering
            var d = true,
                c = document.createElement('canvas');

            c.width = s.o.width;
            c.height = s.o.height;
            s.g = c.getContext('2d');

            s.clear();

            s.dH
            && (d = s.dH());

            (d !== false) && s.draw();

            s.c.drawImage(c, 0, 0);
            c = null;
        }