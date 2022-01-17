function parseBuildAnswers() {
  var code = [],
      srcCode = '',
      copyCount = 0,
      root = common.root,
      version = semver.clean( questions.version ) || '0.0.0',
      outputPath = Path.normalize( questions.path || (root + '/bin') ),
      scriptsPath = Fs.realpathSync( root + '/scripts' ),
      compilation_level = common.compilation_levels[ questions.compilation_level - 1 ];

  //verify output path exists
  if ( !Path.existsSync( outputPath ) ){
    Fs.mkdirSync( outputPath, 0777 )
  }
  //verify path for Lu controls exist
  if ( !Path.existsSync( outputPath + '/lu-controls' ) ){
    Fs.mkdirSync(outputPath + '/lu-controls', 0777 )
  }

  //concat lu.js together
  if( questions.use_ptclass === 'y' || questions.use_ptclass === '' ) {
    code.push( Fs.readFileSync( scriptsPath + '/libraries/ptclass.js' ).toString() );
  }

  if( questions.underscore_mixins === 'y' || questions.underscore_mixins === '' ) {
    code.push( Fs.readFileSync( scriptsPath + '/lu-underscore-mixins.js' ).toString() );
  }

  code.push( Fs.readFileSync( scriptsPath + '/lu.js' ).toString() );

  srcCode = code.join('\n');

  //compile lu.js
  Compiler.compile( srcCode, compilation_level, function( error, compiledSrc ) {
    if (error) {
      //there was an error compiling. Default to writing uncompile source
      compiledSrc = srcCode;
    }

    Fs.writeFileSync( outputPath + '/lu.js', compiledSrc, 'utf-8' );//TODO: turn this in to a build.copy call

    build.isRunDone( 'compile', !!error );
  } );

  //process and copy lu-config.js
  build.copy( scriptsPath + '/lu-config.js', outputPath + '/lu-config.js', function(error) {
    build.isRunDone( 'lu-config', !!error );
  } );

  //copy specified version of Lu controls to output path
  function isCopyDone() {
    ( --copyCount === 0 ) && build.isRunDone( 'copy' );
  }

  for( var control in luControls ) {
    if( luControls.hasOwnProperty( control ) && semver.gte(luControls[control], version)){
      var filename = Path.relative(root + '/scripts/lu-controls/', control),
          controlTo = outputPath + '/lu-controls/' + filename;

      //inc the amount of controls we're copying
      copyCount ++;

      //compile first, then copy
      Compiler.compile( Fs.readFileSync( control ), compilation_level, function( controlTo, error, compiledControl) {

        //copies a control (as a read stream) to the output path (as a write stream).)
        //if error, copy the uncompile source.
        if (error) {
          compiledControl = control;
        }
        build.copy( compiledControl, controlTo, isCopyDone );

      }.bind(null, controlTo));
    }

  }
}