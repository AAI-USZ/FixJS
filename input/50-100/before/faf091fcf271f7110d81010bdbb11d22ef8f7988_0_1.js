function(obj) {
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        console.log(curtop);
        console.log(NewCommentsHighlighter.newcomments_padding);
        return [curtop - NewCommentsHighlighter.newcomments_padding];
        }
    }