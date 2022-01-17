function (event) {
                udm (event);
                var z = gmap.getZoom ();
                if (z < 16) {
                    z = Math.ceil (z * 1.15);
                    gmap.setZoom (z);
                }
                wc.demLookup();
            }