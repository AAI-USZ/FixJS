function query_map(){
    if(map == undefined) {
        center = new google.maps.LatLng(10.491428, -66.877063);//(10.496921301376776, -66.87456739434396);

        mapOptions = {
            zoom   : 20,
            center : center,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };

        map = new google.maps.Map($("#map_canvas")[0], mapOptions);


        //Circle
        var populationOptions = {
            strokeColor  : "#FF0000",
            strokeOpacity: 1,
            strokeWeight : 2,
            fillColor    : "#FF0000",
            fillOpacity  : 0.1,
            center       : center,
            radius       : 100,
            map          : map
        };

        cityCircle = new google.maps.Circle(populationOptions);


        cityCircle.setEditable(true);

        only_numbers_patt = /\d+/;

        $( "#size_slider" ).slider({
                range : "min",
                value : 1,
                min   : 0,
                max   : 40,
                step  : 0.1,
                slide : function( event, ui ) {
                    $( "#circle_size" ).val( ui.value +" Km" );
                    cityCircle.setRadius(ui.value * 1000);
                }
        });

        $( "#circle_size" ).val( $( "#size_slider" ).slider( "value" ) +" Km" );
        cityCircle.setRadius($( "#size_slider" ).slider( "value" ) * 1000);

        $( "#circle_size" ).on("change",function(){
            var val = + only_numbers_patt.exec( $( "#circle_size" ).val() );
            cityCircle.setRadius(val * 1000);
            $( "#size_slider" ).slider("option", "value", val );
        });

        cityCircle.radius_changed = function() {
            var radius = Math.round(cityCircle.radius) / 1000;
            $( "#circle_size" ).val( radius +" Km" );
            $( "#size_slider" ).slider("option", "value", radius );

            setBounds ();
        };

        cityCircle.center_changed = function() { setBounds (); };
        setBounds ();
    }
}