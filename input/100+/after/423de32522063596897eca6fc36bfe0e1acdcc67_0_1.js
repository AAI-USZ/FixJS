function (){
    var max_len  = 0;
    var help     = [ 'Usage: thunder [command] [argument(s)]\n', 'Commands:' ];
    var commands = [
      [ '-v', '--version', 'Display thunder version' ],
      [ 'h', 'help', 'Display usage information' ],
      [ 'b', 'build [args]', 'Precompile templates' ],
      [ 'w', 'watch [args]', 'Watch for changes' ]
    ];

    commands.forEach( function( cmd ){
      if( cmd[ 1 ].length > max_len ){
        max_len = cmd[ 1 ].length;
      }
    });

    commands.forEach( function( cmd ){
      help.push( '  ' + utils.add_spaces( cmd[ 0 ] + ',', 4 ) +
        utils.add_spaces( cmd[ 1 ], max_len + 1 ) + cmd[ 2 ]);
    });

    help.push( '\nArguments for `build` & `watch commands`' );
    help.push( '  ' + '-i, --input=/new/input/dir   Default: ./templates' );
    help.push( '  ' + '-o, --output=/new/output/dir Default: ./views' );
    help.push( '  ' + '-r, --requirejs=false        Default: true' );
    console.log( help.join('\n'));
  }