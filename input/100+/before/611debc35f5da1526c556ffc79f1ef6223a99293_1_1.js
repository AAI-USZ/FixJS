function( butter ) {
        butter.dialog.register( "test", testDialogSrc, function( internal ){
          internal.listen( "test", function( e ){
            internal.send( "test", "test" );
          });
        });
        var external = butter.dialog.spawn( "test" );
        external.listen( "test", function( e ){
          ok( true, "Communication channels open" );
          ok( butter.dialog.modal.element.querySelector( ".butter-dialog" ) === external.element, "Dialog element is correct and on page." );
        });

        external.listen( "open", function(){
          external.send( "test" );
          ok( true, "Open handler called." );
          external.listen( "close", function(){
            ok( true, "Close handler called." );
            start();
          });
          external.close();
        });
      }