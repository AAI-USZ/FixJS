function(lat, lon, err) {
        // math lifted from maps.forum.nu.  you want map examples, go there.
        with (Math) {
            var points = Array();
            var d = err/6378800;// accuracy / meters of Earth radius = radians  
            var lat1 = (PI/180)* lat; // radians                                                                                                                                                                                    
            var lng1 = (PI/180)* lon; // radians 
            
            for (var a = 0 ; a < 361 ; a+=10 ) {
                var tc = (PI/180)*a;
                var y = asin(sin(lat1)*cos(d)+cos(lat1)*sin(d)*cos(tc));
                var dlng = atan2(sin(tc)*sin(d)*cos(lat1),cos(d)-sin(lat1)*sin(y));
                var x = ((lng1-dlng+PI) % (2*PI)) - PI ; // MOD function
                var point = new GLatLng(parseFloat(y*(180/PI)),parseFloat(x*(180/PI)));
                points.push(point);
            }
        }
        return new GPolygon(points,'#0000ff',1,1,'#0000ff',0.2)
    }