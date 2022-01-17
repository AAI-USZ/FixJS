function( event, ui ) {
                    $( "#circle_size" ).val( ui.value +" Km" );
                    cityCircle.setRadius(ui.value * 1000);
                }