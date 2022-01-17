function ( loc ) {
      var req = JSON.stringify({ command: 'FLYTO', location: loc })
      console.log(req);
      $.ajax({ type: 'POST',
               url: '/command',
               data: req 
             });
      }