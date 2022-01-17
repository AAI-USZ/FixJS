function Linechart(paper, x, y, width, height, valuesx, valuesy, opts) {
        
        var chartinst = this;
        
        opts = opts || {};

        if (!paper.raphael.is(valuesx[0], "array")) {
            valuesx = [valuesx];
        }

        if (!paper.raphael.is(valuesy[0], "array")) {
            valuesy = [valuesy];
        }

        opts.gutter = opts.gutter || 10;
        opts.symbol = opts.symbol || "";
        opts.colors = opts.colors || chartinst.colors;
        opts.width = opts.width || 2;
        opts.dash = opts.dash || "";

        var gutter = opts.gutter,
            symbol = opts.symbol,
            colors = opts.colors,
            columns = null,
            dots = null,
            chart = paper.set(),
            path = [];

        chart.x = x;
        chart.y = y;
        chart.width = width;
        chart.height = height;


        var shades = paper.set();

        for (i = 0, ii = valuesy.length; i < ii; i++) {
            if (opts.shade) {
                shades.push(paper.path().attr({ stroke: "none", fill: colors[i], opacity: opts.nostroke ? 1 : .3 }));
            }
        }

        var allx = Array.prototype.concat.apply([], valuesx);
        var ally = Array.prototype.concat.apply([], valuesy);
        var minx = opts.minx || Math.floor(Math.min.apply(Math, allx) - 1);
        var maxx = opts.maxx || Math.ceil(Math.max.apply(Math, allx) + 1);
        var miny = opts.miny || Math.floor(Math.min.apply(Math, ally) - 1);
        var maxy = opts.maxy || Math.ceil(Math.max.apply(Math, ally) + 1);
        var kx = (width - gutter * 2) / ((maxx - minx) || 1);
        var ky = (height - gutter * 2) / ((maxy - miny) || 1);

        var axis = paper.set();

        if (opts.axis) {
            var ax = (opts.axis + "").split(/[,\s]+/);
            //(+ax[0] || +ax[2]) && chartinst.grid(x + gutter, gutter + 10, width - 2 * gutter, height - 2 * gutter, opts.axisxstep || Math.floor((width - 2 * gutter) / 20), 0, paper);
            (+ax[1] || +ax[3]) && chartinst.grid(x + gutter, y + height - gutter, width - 2 * gutter, height - 2 * gutter, opts.axisystep || Math.floor((height - 2 * gutter) / 20), 1, paper);
        }

        if (opts.axis) {
            var axisLabelsInside = 1;
            if (opts.axisLabelsInside) {
                axisLabelsInside = -1;
            }

            var ax = (opts.axis + "").split(/[,\s]+/);
            +ax[0] && axis.push(chartinst.axis(x + gutter, y + gutter, width - 2 * gutter, minx, maxx, opts.axisxstep || Math.floor((width - 2 * gutter) / 20), 2 * axisLabelsInside, paper));
            +ax[1] && axis.push(chartinst.axis(x + width - gutter, y + height - gutter, height - 2 * gutter, miny, maxy, opts.axisystep || Math.floor((height - 2 * gutter) / 20), 3 * axisLabelsInside, paper));
            +ax[2] && axis.push(chartinst.axis(x + gutter, y + height - gutter, width - 2 * gutter, minx, maxx, opts.axisxstep || Math.floor((width - 2 * gutter) / 20), 0, paper));
            +ax[3] && axis.push(chartinst.axis(x + gutter, y + height - gutter, height - 2 * gutter, miny, maxy, opts.axisystep || Math.floor((height - 2 * gutter) / 20), 1 * axisLabelsInside, paper));
        }

        var lines = paper.set(),
            symbols = paper.set(),
            line;

        for (i = 0, ii = valuesy.length; i < ii; i++) {
            if (!opts.nostroke) {
                lines.push(line = paper.path().attr({
                    stroke: colors[i],
                    "stroke-width": opts.width,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    "stroke-dasharray": opts.dash
                }));
            }

            var sym = Raphael.is(symbol, "array") ? symbol[i] : symbol,
                symset = paper.set();

            path = [];

            for (var j = 0, jj = valuesy[i].length; j < jj; j++) {
                var X = x + gutter + ((valuesx[i] || valuesx[0])[j] - minx) * kx,
                    Y = y + height - gutter - (valuesy[i][j] - miny) * ky;

                (Raphael.is(sym, "array") ? sym[j] : sym) && symset.push(paper[Raphael.is(sym, "array") ? sym[j] : sym](X, Y, (opts.width || 2) * 3).attr({ fill: colors[i], stroke: "none" }));

                if (opts.smooth) {
                    if (j && j != jj - 1) {
                        var X0 = x + gutter + ((valuesx[i] || valuesx[0])[j - 1] - minx) * kx,
                            Y0 = y + height - gutter - (valuesy[i][j - 1] - miny) * ky,
                            X2 = x + gutter + ((valuesx[i] || valuesx[0])[j + 1] - minx) * kx,
                            Y2 = y + height - gutter - (valuesy[i][j + 1] - miny) * ky,
                            a = getAnchors(X0, Y0, X, Y, X2, Y2);

                        path = path.concat([a.x1, a.y1, X, Y, a.x2, a.y2]);
                    }

                    if (!j) {
                        path = ["M", X, Y, "C", X, Y];
                    }
                } else {
                    path = path.concat([j ? "L" : "M", X, Y]);
                }
            }

            if (opts.smooth) {
                path = path.concat([X, Y, X, Y]);
            }

            symbols.push(symset);

            if (opts.shade) {
                shades[i].attr({ path: path.concat(["L", X, y + height - gutter, "L",  x + gutter + ((valuesx[i] || valuesx[0])[0] - minx) * kx, y + height - gutter, "z"]).join(",") });
            }

            !opts.nostroke && line.attr({ path: path.join(",") });
        }

        function createColumns(f) {
            // unite Xs together
            var Xs = [];

            for (var i = 0, ii = valuesx.length; i < ii; i++) {
                Xs = Xs.concat(valuesx[i]);
            }

            //Xs.sort();
            // remove duplicates

            var Xs2 = [],
                xs = [];

            for (i = 0, ii = Xs.length; i < ii; i++) {
                Xs[i] != Xs[i - 1] && Xs2.push(Xs[i]) && xs.push(x + gutter + (Xs[i] - minx) * kx);
            }

            Xs = Xs2;
            ii = Xs.length;

            var cvrs = f || paper.set();

            for (i = 0; i < ii; i++) {
                var X = xs[i] - (xs[i] - (xs[i - 1] || x)) / 2;
                var w = ((xs[i + 1] || x + width) - xs[i]) / 2 + (xs[i] - (xs[i - 1] || x)) / 2;
                var C;

                f ? (C = {}) : cvrs.push(C = paper.rect(X - 1, y, Math.max(w + 1, 1), height).attr({ stroke: "none", fill: "#000", opacity: 0 }));
                C.values = [];
                C.symbols = paper.set();
                C.y = [];
                C.x = xs[i];
                C.axis = Xs[i];
                C.index = [];

                for (var j = 0, jj = valuesy.length; j < jj; j++) {
                    Xs2 = valuesx[j] || valuesx[0];

                    for (var k = 0, kk = Xs2.length; k < kk; k++) {
                        if (Xs2[k] == Xs[i]) {
                            C.values.push(valuesy[j][k]);
                            C.y.push(y + height - gutter - (valuesy[j][k] - miny) * ky);
                            C.symbols.push(chart.symbols[j][k]);
                            C.index.push(k);
                        }
                    }
                }

                f && f.call(C);
            }

            !f && (columns = cvrs);

            chart.columns = columns;
        }

        function createDots(f) {
            var cvrs = f || paper.set(),
                C;

            for (var i = 0, ii = valuesy.length; i < ii; i++) {
                for (var j = 0, jj = valuesy[i].length; j < jj; j++) {
                    var X = x + gutter + ((valuesx[i] || valuesx[0])[j] - minx) * kx,
                        nearX = x + gutter + ((valuesx[i] || valuesx[0])[j ? j - 1 : 1] - minx) * kx,
                        Y = y + height - gutter - (valuesy[i][j] - miny) * ky;

                    f ? (C = {}) : cvrs.push(C = paper.circle(X, Y, Math.abs(nearX - X) / 2).attr({ stroke: "none", fill: "#000", opacity: 0 }));
                    C.x = X;
                    C.y = Y;
                    C.value = valuesy[i][j];
                    C.line = chart.lines[i];
                    C.shade = chart.shades[i];
                    C.symbol = chart.symbols[i][j];
                    C.symbols = chart.symbols[i];
                    C.axis = (valuesx[i] || valuesx[0])[j];
                    f && f.call(C);
                }
            }

            !f && (dots = cvrs);

            chart.dots = dots;
        }

        chart.push(lines, shades, symbols, axis);
        chart.lines = lines;
        chart.shades = shades;
        chart.symbols = symbols;
        chart.axis = axis;

        chart.hoverColumn = function (fin, fout) {
            !columns && createColumns();
            columns.mouseover(fin).mouseout(fout);
            return this;
        };

        chart.clickColumn = function (f) {
            !columns && createColumns();
            columns.click(f);
            return this;
        };

        chart.hrefColumn = function (cols) {
            var hrefs = paper.raphael.is(arguments[0], "array") ? arguments[0] : arguments;

            if (!(arguments.length - 1) && typeof cols == "object") {
                for (var x in cols) {
                    for (var i = 0, ii = columns.length; i < ii; i++) if (columns[i].axis == x) {
                        columns[i].attr("href", cols[x]);
                    }
                }
            }

            !columns && createColumns();

            for (i = 0, ii = hrefs.length; i < ii; i++) {
                columns[i] && columns[i].attr("href", hrefs[i]);
            }

            return this;
        };

        chart.hover = function (fin, fout) {
            !dots && createDots();
            dots.mouseover(fin).mouseout(fout);
            return this;
        };

        chart.click = function (f) {
            !dots && createDots();
            dots.click(f);
            return this;
        };

        chart.each = function (f) {
            createDots(f);
            return this;
        };

        chart.eachColumn = function (f) {
            createColumns(f);
            return this;
        };

        chart.opts = opts;
        return chart;
    }