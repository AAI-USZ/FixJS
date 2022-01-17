function(){
            var val = + only_numbers_patt.exec( $( "#circle_size" ).val() );
            cityCircle.setRadius(val);
            $( "#size_slider" ).slider("option", "value", val );
        }