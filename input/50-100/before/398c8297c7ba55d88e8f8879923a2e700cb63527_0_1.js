function (event) {
            if (!wc.local.map.map) {
                wc.local.mapqueue = function () {
                    wc.local.map.showPlace (event.data);
                };
                $('#FindLatLonByMapButton').click();
            }
            else {
                wc.local.map.showPlace (event.data);
            }
            $.smoothScroll ({
                scrollElement: $('#bg2'),
                scrollTarget: $('#gMapGridBox'),
                offset: -85
            });
            
            return false;
        }