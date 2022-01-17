function onAttach(connection) {
    console.log(window.location + ' attach');

    // Add initial methods for the panel to use
    //
    connection.register(
      'hello',        // URL for commands from panel to devtools
      {
        // feature documentation
        options: function() {
          return {
            put: 'body ignored; {message:}'
          };
        },
        
        // When the panel sends us "hello", finally we can dequeue any buffers
        put: function (obj) {
          return {message:'hey'};
        }
      }
    );

    function childErr(err) {
      console.error("Child recvd err", err);
    }

    // Send something to the 'purplePanel'
    //
    connection.putObject( 
      'hello',                      // at this URL
      {message:'I am your creator'},  // store this object
      function(reply) {             // then call me
        // Just log for the demo
        console.log("Creator hears: "+reply.message, reply);
      },        
      childErr                      // or fail
    );
    
    panel_isReady = true;
    if (buffer) {
      console.log('loading buffer', buffer);
      load.apply(null, buffer);
      buffer = null;
    }

  }