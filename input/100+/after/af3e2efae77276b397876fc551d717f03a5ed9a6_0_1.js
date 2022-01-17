function($) {

    function drawLine(map, lineLayer, position, angleInDegrees) {
        lineLayer.removeAllFeatures();

        var lon1 = position.coords.longitude;
        var lat1 = position.coords.latitude;
        var angleInRadians = 2 * Math.PI * angleInDegrees / 360;
        var lon2 = position.coords.longitude + 0.01 * Math.sin(angleInRadians);
        var lat2 = position.coords.latitude + 0.01 * Math.cos(angleInRadians);

        var points = new Array(
           new OpenLayers.Geometry.Point(lon1, lat1).transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
              ),
           new OpenLayers.Geometry.Point(lon2, lat2).transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
              )
        );

        var line = new OpenLayers.Geometry.LineString(points);

        var style = { 
          strokeColor: '#0000ff', 
          strokeOpacity: 0.8,
          strokeWidth: 5
        };

        var lineFeature = new OpenLayers.Feature.Vector(line, null, style);
        lineLayer.addFeatures([lineFeature]);
    }

    function centerMapAt(map, markers, position) {
        //Set center and zoom
        var lonLat = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform(
                new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
                map.getProjectionObject() // to Spherical Mercator Projection
              );

        var zoom=15;

        map.setCenter(lonLat, zoom);  

        var size = new OpenLayers.Size(21,25);
        var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
        var anIcon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);

        var aMarker = new OpenLayers.Marker(lonLat, anIcon);
        markers.addMarker(aMarker);


    };

    function getShortTimeString(theDate) {
        return theDate.toString("HH:mm");
    }

    function logCurrentSunPosition(map, lineLayer, position) {
        var currently = new Date();

        var currentAzimuth = azimuth(position.coords.longitude, position.coords.latitude, currently);
        var currentAltitude = altitude(position.coords.longitude, position.coords.latitude, currently);

        drawLine(map, lineLayer, position, currentAzimuth);

        $("#currenttime").text(getShortTimeString(currently));
        $("#azimuth").text(currentAzimuth.toFixed(0));
        $("#altitude").text(currentAltitude.toFixed(0));
    }

    function getUniversalTime(h,m,z)
    {
        return (h-z+m/60);
    }

    function getJulianDate(y,m,d,u)
    {
        return (367*y)-Math.floor((7/4)*(Math.floor((m+9)/12)+y))+Math.floor(275*m/9)+d-730531.5+(u/24)
    }

    function frm(n)
    {
        return Math.round(n*1000)/1000
    }

    function azimuth(lg, la, theDate)
    {
        with (Math) {
            var uu=getUniversalTime(theDate.getUTCHours(), theDate.getUTCMinutes(), 0);
            var jj=getJulianDate(theDate.getFullYear(), theDate.getMonth() + 1, theDate.getDate(), uu);
            var T=jj/36525;
            var k=PI/180.0;
            var M=357.5291+35999.0503*T-0.0001559*T*T-0.00000045*T*T*T

            M=M % 360
            
            var Lo=280.46645+36000.76983*T+0.0003032*T*T
            
            Lo=Lo % 360
            
            var DL=(1.9146-0.004817*T-0.000014*T*T)*sin(k*M)+(0.019993-0.000101*T)*sin(k*2*M)+0.00029*sin(k*3*M)
            var L=Lo+DL
            var eps=23.43999-0.013*T
            var delta=(1/k)*asin(sin(L*k)*sin(eps*k))
            var RA=(1/k)*atan2(cos(eps*k)*sin(L*k),cos(L*k))
            
            RA=(RA+360) % 360
            
            var GMST=280.46061837+360.98564736629*jj+0.000387933*T*T-T*T*T/38710000
            
            GMST=(GMST+360) % 360
            
            var LMST=GMST+lg
            var H=LMST-RA
            var eqt=(Lo-RA)*4
            var azm=(1/k)*atan2(-sin(H*k),cos(la*k)*tan(delta*k)-sin(la*k)*cos(H*k))
            
            azm=(azm+360) % 360

            return azm
        }
    }

    function altitude(lg, la, theDate)
    {
        with (Math) {
            var uu=getUniversalTime(theDate.getUTCHours(), theDate.getUTCMinutes(), 0);
            var jj=getJulianDate(theDate.getFullYear(), theDate.getMonth() + 1, theDate.getDate(), uu);
            var T=jj/36525;
            var k=PI/180.0;
            var M=357.5291+35999.0503*T-0.0001559*T*T-0.00000045*T*T*T
            M=M % 360
            var Lo=280.46645+36000.76983*T+0.0003032*T*T
            Lo=Lo % 360
            var DL=(1.9146-0.004817*T-0.000014*T*T)*sin(k*M)+(0.019993-0.000101*T)*sin(k*2*M)+0.00029*sin(k*3*M)
            L=Lo+DL
            var eps=23.43999-0.013*T
            var delta=(1/k)*asin(sin(L*k)*sin(eps*k))
            var RA=(1/k)*atan2(cos(eps*k)*sin(L*k),cos(L*k))
            RA=(RA+360) % 360
            var GMST=280.46061837+360.98564736629*jj+0.000387933*T*T-T*T*T/38710000
            GMST=(GMST+360) % 360
            var LMST=GMST+lg
            var H=LMST-RA
            var eqt=(Lo-RA)*4
            var alt=(1/k)*asin(sin(la*k)*sin(delta*k)+cos(la*k)*cos(delta*k)*cos(H*k))
            return alt;
        }
    }

    function getFirstLight(position, theDate) {
        for (hours = 0; hours < 24; hours++) {
            for (minutes = 0; minutes < 60; minutes++) {
                var tempDate = theDate;
                tempDate.setHours(hours);
                tempDate.setMinutes(minutes);

                if (altitude(position.coords.longitude, position.coords.latitude, tempDate) >= 5) {
                    return tempDate;
                }
            }
        }
    }

    function getLastLight(position, theDate) {
        for (hours = 23; hours >= 0; hours--) {
            for (minutes = 59; minutes >= 0; minutes--) {
                var tempDate = theDate;
                tempDate.setHours(hours);
                tempDate.setMinutes(minutes);

                if (altitude(position.coords.longitude, position.coords.latitude, tempDate) >= 5) {
                    return tempDate;
                }
            }
        }
    }



    $(document).ready(function(){

        var map = new OpenLayers.Map("mapdiv");
        map.addLayer(new OpenLayers.Layer.OSM());

        markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);

        var lineLayer = new OpenLayers.Layer.Vector("Line Layer"); 

        map.addLayer(lineLayer);                    
        map.addControl(new OpenLayers.Control.DrawFeature(lineLayer, OpenLayers.Handler.Path));                                     

      //    var pois = new OpenLayers.Layer.Text( "My Points",
      //                    { location:"./textfile.txt",
      //                      projection: map.displayProjection
      //                    });

      //    map.addLayer(pois);

      navigator.geolocation.getCurrentPosition(function(position) {
        centerMapAt(map, markers, position);
        logCurrentSunPosition(map, lineLayer, position);
        $('#firstlight').text(getShortTimeString(getFirstLight(position, new Date())));
        $('#lastlight').text(getShortTimeString(getLastLight(position, new Date())));
        window.setInterval(function() {logCurrentSunPosition(map, lineLayer, position)}, 10000);
      }); 

    });



    // If using Twitter Bootstrap, you need to require all the
    // components that you use, like so:
    // require('bootstrap/dropdown');
    // require('bootstrap/alert');
}