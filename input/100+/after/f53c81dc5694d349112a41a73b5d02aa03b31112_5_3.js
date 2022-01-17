function (markers){
            var opts = this.data('gmap').opts;

            if (markers.length !== 0) {
                if (opts.log) {console.log("adding " + markers.length +" markers");}
                // Loop through marker array
                for (var i = 0; i < markers.length; i+= 1) {
                    methods.addMarker.apply(this,[markers[i]]);
                }
            }
        }