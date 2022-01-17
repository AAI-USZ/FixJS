function(url) {
            var callback = "sakai_global.documentviewer.googlemaps." + tuid;
            sakai_global.documentviewer.googlemaps[tuid].url=url;
            if (window["google"]) {
                debug.info("Already have google maps api calling the callback ourselves");
                sakai_global.documentviewer.googlemaps[tuid]();
            } else {
                debug.info("Getting google maps api");
                require(["//maps.google.com/maps/api/js?sensor=false&callback="+callback]);
            }
        }