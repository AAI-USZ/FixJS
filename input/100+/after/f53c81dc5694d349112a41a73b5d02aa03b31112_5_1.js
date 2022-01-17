function () {

            var markers = this.data('gmap').markers, i;
            var mostN = 1000,
                mostE = -1000,
                mostW = 1000,
                mostS = -1000;
            if(markers) {
                for (i = 0; i < markers.length; i += 1) {
                    if(mostN > markers[i].getPosition().lat()) {mostN = markers[i].getPosition().lat(); }
                    if(mostE < markers[i].getPosition().lng()) {mostE = markers[i].getPosition().lng(); }
                    if(mostW > markers[i].getPosition().lng()) {mostW = markers[i].getPosition().lng(); }
                    if(mostS < markers[i].getPosition().lat()) {mostS = markers[i].getPosition().lat(); }
                }
                methods._boundaries = {N: mostN, E: mostE, W: mostW, S: mostS};
            }

            if(mostN == -1000) methods._boundaries = {N: 0, E: 0, W: 0, S: 0};

            return methods._boundaries;
        }