function branchGraph(holder) {
    var ch = mspace * 20 + 20, cw = mtime * 20 + 20,
        r = Raphael("holder", cw, ch),
        top = r.set();
    var cuday = 0, cumonth = "";
    r.rect(0, 0, days.length * 20 + 80, 30).attr({fill: "#222"});
    r.rect(0, 30, days.length * 20 + 80, 20).attr({fill: "#444"});

    for (mm = 0; mm < days.length; mm++) {
        if(days[mm] != null){
            if(cuday != days[mm][0]){
                r.text(10 + mm * 20, 40, days[mm][0]).attr({font: "14px Fontin-Sans, Arial", fill: "#DDD"});
                cuday = days[mm][0]
            }
            if(cumonth != days[mm][1]){
                r.text(10 + mm * 20, 15, days[mm][1]).attr({font: "14px Fontin-Sans, Arial", fill: "#EEE"});
                cumonth = days[mm][1]
            }

        }
    }
    for (i = 0; i < ii; i++) {
        var x = 10 + 20 * commits[i].time,
            y = 70 + 20 * commits[i].space;
        r.circle(x, y, 3).attr({fill: colors[commits[i].space], stroke: "none"});
        if (commits[i].refs != null && commits[i].refs != "") {
            var longrefs = commits[i].refs
            var shortrefs = commits[i].refs;
            if (shortrefs.length > 15){
              shortrefs = shortrefs.substr(0,13) + "...";
            }
            var t = r.text(x+5, y+5, shortrefs).attr({font: "12px Fontin-Sans, Arial", fill: "#666",
            title: longrefs, cursor: "pointer", rotation: "90"});

            var textbox = t.getBBox();
            t.translate(textbox.height/-4,textbox.width/2);
        }
        for (var j = 0, jj = commits[i].parents.length; j < jj; j++) {
            var c = comms[commits[i].parents[j][0]];
            if (c) {
                var cx = 10 + 20 * c.time,
                    cy = 70 + 20 * c.space;
                if (c.space == commits[i].space) {
                    r.path("M" + (x - 5) + "," + (y + .0001) + "L" + (15 + 20 * c.time) + "," + (y + .0001))
                    .attr({stroke: colors[c.space], "stroke-width": 2});

                } else if (c.space < commits[i].space) {
                    r.path(["M", x - 5, y + .0001, "l-5-2,0,4,5,-2C", x - 5, y, x - 17, y + 2, x - 20, y - 5, "L", cx, y - 5, cx, cy])
                    .attr({stroke: colors[commits[i].space], "stroke-width": 2});
                } else {
                    r.path(["M", x - 3, y + 6, "l-4,3,4,2,0,-5L", x - 10, y + 20, "L", x - 10, cy, cx, cy])
                    .attr({stroke: colors[c.space], "stroke-width": 2});
                }
            }
        }
        (function (c, x, y) {
            top.push(r.circle(x, y, 10).attr({fill: "#000", opacity: 0, cursor: "pointer"})
            .click(function(){
              location.href = location.href.replace("graph", "commits/" + c.id);
            })
            .hover(function () {
                var s = r.text(100, 100,c.author + "\n \n" +c.id + "\n \n" + c.message).attr({fill: "#fff"});
                this.popup = r.popupit(x, y + 5, s, 0);
                top.push(this.popup.insertBefore(this));
            }, function () {
                this.popup && this.popup.remove() && delete this.popup;
            }));
        }(commits[i], x, y));
    }
    top.toFront();
    var hw = holder.offsetWidth,
        hh = holder.offsetHeight,
        v = r.rect(hw - 8, 0, 4, Math.pow(hh, 2) / ch, 2).attr({fill: "#000", opacity: 0}),
        h = r.rect(0, hh - 8, Math.pow(hw, 2) / cw, 4, 2).attr({fill: "#000", opacity: 0}),
        bars = r.set(v, h),
        drag,
        dragger = function (e) {
            if (drag) {
                e = e || window.event;
                holder.scrollLeft = drag.sl - (e.clientX - drag.x);
                holder.scrollTop = drag.st - (e.clientY - drag.y);
            }
        };
    holder.onmousedown = function (e) {
        e = e || window.event;
        drag = {x: e.clientX, y: e.clientY, st: holder.scrollTop, sl: holder.scrollLeft};
        document.onmousemove = dragger;
        bars.animate({opacity: .5}, 300);
    };
    document.onmouseup = function () {
        drag = false;
        document.onmousemove = null;
        bars.animate({opacity: 0}, 300);
    };
    holder.scrollLeft = cw;
}