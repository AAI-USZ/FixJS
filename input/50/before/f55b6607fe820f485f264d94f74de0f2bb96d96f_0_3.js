function() {
            var radius = Math.round(cityCircle.radius);
            $( "#circle_size" ).val( radius +" Km" );
            $( "#size_slider" ).slider("option", "value", radius );

            setBounds ();
        }