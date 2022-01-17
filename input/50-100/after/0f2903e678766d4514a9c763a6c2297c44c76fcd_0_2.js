function (event) {
                udm (event);
                /*var z = gmap.getZoom ();
                if (z < 16) {
                    z = Math.ceil (z * 1.15);
                    gmap.setZoom (z);
                }// don't do the above actually because it conflicts with the default zoom on double click behaviour which won't go away as easily as it might */
                wc.demLookup();
            }