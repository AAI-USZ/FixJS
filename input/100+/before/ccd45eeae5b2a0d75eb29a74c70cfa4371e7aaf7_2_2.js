function (e) {
        var div = that.infoBox_.div_;
        google.maps.event.addDomListener(div, 'click', function (e) {
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
        });
        google.maps.event.addDomListener(div, 'mouseout', function (e) {
            that.isMouseover = false;
        });
        var closeBox = div.firstChild;
        google.maps.event.addDomListener(closeBox, 'click', function (e) {
            that.close();
        });
        google.maps.event.addDomListener(closeBox, 'mouseover', function (e) {
            that.isMouseover = true;
        });
        komoo.event.trigger(that, 'domready');
    }