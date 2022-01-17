function(e) {
        var posx = 0;
        var posy = 0;
        if (!e) { e = window.event; }
        if (e.pageX || e.pageY) {
            // Good browsers
            return {
                x: e.pageX,
                y: e.pageY
            };
        } else if (e.clientX || e.clientY) {
            // Internet Explorer
            var doc = document.documentElement, body = document.body;
            var htmlComputed = document.body.parentNode.currentStyle;
            var topMargin = parseInt(htmlComputed.marginTop, 10) || 0;
            var leftMargin = parseInt(htmlComputed.marginLeft, 10) || 0;
            // return {
            //     x: e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
            //         (doc && doc.clientLeft || body && body.clientLeft || 0) + leftMargin,
            //     y: e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
            //         (doc && doc.clientTop  || body && body.clientTop  || 0) + topMargin
            // };
            return {
              x: e.clientX,
              y: e.clientY
            };
        } else if (e.touches && e.touches.length === 1) {
            // Touch browsers
            return {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY
            };
        }
    }