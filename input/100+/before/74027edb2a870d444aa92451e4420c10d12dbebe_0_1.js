function( $element, settings ){
      var Button = this,
        command = settings.action || ( settings.__params__ ) ? settings.__params__.shift() : undefined,
        decorators = [];

      settings.action = command;

      Switch.init.call( this, $element, settings );

      //Applies a decorator based on the command given
      switch( command ){
        case 'state':
          decorators.push( commandDecorators[command]( Button, _.defaults( settings, defaults ) ) );
          break;
        case 'select':
          decorators.push( commandDecorators[command]( Button, _.defaults( settings, defaults ) ) );
          break;
        case 'first':
          _.defaults( settings, defaults );
          decorators.push( defaultDecorator( Button, settings ) );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        case 'last':
          _.defaults( settings, defaults );
          decorators.push( defaultDecorator( Button, settings ) );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        case 'previous':
          _.defaults( settings, defaults );
          decorators.push( defaultDecorator( Button, settings ) );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        case 'next':
          _.defaults( settings, defaults );
          decorators.push( defaultDecorator( Button, settings ) );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        case 'play':
          _.defaults( settings, defaults );
          decorators.push( defaultDecorator( Button, settings ) );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        case 'pause':
          _.defaults( settings, defaults );
          decorators.push( defaultDecorator( Button, settings ) );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        case 'load':
          _.defaults( settings, defaults );
          decorators.push( commandDecorators[command]( Button, settings ) );
          break;
        default:
          decorators.push( defaultDecorator( Button, _.defaults( settings, defaults ) ) );
      }

      //Decorators for buttons should be separated into other files,
      //somthing like the below should be possible.
      // require.ensure( [command], function( require, module, exports ){
      //   var req = require,
      //     decorator = ( req( command ) )( Button, settings );
      //  Button.decorate.apply( this, decorators );
      // } );

      Button.decorate.apply( this, decorators );

      //binds the spacebar to the on event
      bindSpaceBar( Button, settings.on );
    }