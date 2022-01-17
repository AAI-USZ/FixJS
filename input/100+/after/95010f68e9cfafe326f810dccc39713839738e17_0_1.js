function()
        {
          this.bind
              (
                  'run',
                  function( event, config )
                  {
                    if( 0 === config.start_url.length )
                    {
                      location.href = '#/';
                      return false;
                    }
                  }
              );

          this.bind
              (
                  'error',
                  function( message, original_error )
                  {
                    alert( original_error.message );
                  }
              );

          // activate_core
          this.before
              (
                  {},
                  function( context )
                  {
                    if( app.timeout )
                    {
                      if (console.debug) {
                        console.debug( 'Clearing Timeout #' + app.timeout );
                      }
                      clearTimeout( app.timeout );
                    }

                    var menu_wrapper = $( '#menu-wrapper' );

                    $( 'li[id].active', menu_wrapper )
                        .removeClass( 'active' );

                    $( 'li.active', menu_wrapper )
                        .removeClass( 'active' );

                    if( this.params.splat )
                    {
                      var selector = '~' === this.params.splat[0][0]
                          ? '#' + this.params.splat[0].replace( /^~/, '' ) + '.global'
                          : '#menu-selector #' + this.params.splat[0];

                      var active_element = $( selector, menu_wrapper );

                      if( 0 === active_element.size() )
                      {
                        this.app.error( 'There exists no core with name "' + this.params.splat[0] + '"' );
                        return false;
                      }

                      active_element
                          .addClass( 'active' );

                      if( this.params.splat[1] )
                      {
                        $( '.' + this.params.splat[1], active_element )
                            .addClass( 'active' );
                      }

                      if( !active_element.hasClass( 'global' ) )
                      {
                        this.active_core = active_element;
                      }
                    }
                  }
              );
        }