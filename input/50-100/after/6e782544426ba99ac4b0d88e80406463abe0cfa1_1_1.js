function(x, y, contents) {
        $('<div id="graph-tooltip">' + contents + '</div>').css({
            top: y + 5,
            left: x + 5
        }).appendTo("body").fadeIn(200);
    }