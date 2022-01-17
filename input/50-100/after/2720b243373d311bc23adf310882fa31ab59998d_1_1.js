function(){

  stop();

  var wstream = new ExampleWriteStream();

  wstream.write = function( data ){
    if( data.type == "load" ){
      ok( data instanceof ProgressEvent );
      equal( data.currentTarget.result, "hello world" );
    }
    start();
  };

  var fs = new FileStream( this.blob );
  fs.pipe( wstream );

}