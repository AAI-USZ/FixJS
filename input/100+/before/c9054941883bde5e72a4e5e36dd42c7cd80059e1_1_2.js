function arrows(path) {
            var type = path.constructor.prototype;

            if (type === Raphael.el) {
                if (path.type === "path" && typeof path.arrowheadsDrawn === "undefined") {
                    var w = path.attr("stroke-width"), s = 0.6 + 0.4 * w;
                    var l = path.getTotalLength();

                    if (l < 0.75 * s) {
                        // You're weird because that's a *really* short path
                        // Giving up now before I get more confused

                    } else {
                        // This makes a lot more sense
                        var set = raphael.set();
                        var head = raphael.path("M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4");
                        var end = path.getPointAtLength(l - 0.4);
                        var almostTheEnd = path.getPointAtLength(l - 0.75 * s);
                        var angle = Math.atan2(end.y - almostTheEnd.y, end.x - almostTheEnd.x) * 180 / Math.PI;
                        var attrs = path.attr();
                        delete attrs.path;

                        var subpath = path.getSubpath(0, l - 0.75 * s);
                        subpath = raphael.path(subpath).attr(attrs);
                        subpath.arrowheadsDrawn = true;
                        path.remove();

                        head.attr(attrs).attr({
                            "stroke-linejoin": "round",
                            "stroke-linecap": "round"
                        }).transform("t" + almostTheEnd.x + "," +
                            almostTheEnd.y + "r" + angle + ",0.75,0" +
                            "s" + s + "," + s + ",0.75,0");
                        head.arrowheadsDrawn = true;
                        set.push(subpath);
                        set.push(head);
                        return set;
                    }
                }
            } else if (type === Raphael.st) {
                for (var i = 0, l = path.items.length; i < l; i++) {
                    arrows(path.items[i]);
                }
            }
        }