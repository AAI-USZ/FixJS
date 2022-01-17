function ( path ) {
      var
        req = new XMLHttpRequest(),
        _this = this;

      console.log('path : '+path);

      req.open( 'GET', path, true );
      req.responseType = 'arraybuffer';

      req.onload = function () {
        if ( _this.context.decodeAudioData ) {
          console.log('audio data decoded');
          _this.context.decodeAudioData( req.response, function( buffer ) {
            _this.buffer = buffer;
            connectContext.call( _this );
            _this.isLoaded = true;
            _this.dancer.trigger( 'loaded' );
          }, function( e ) {
            console.log( e );
          });
        } else {
          console.log('no audio data');
          _this.buffer = _this.context.createBuffer( req.response, false );
          connectContext.call( _this );
          _this.isLoaded = true;
          _this.dancer.trigger( 'loaded' );
        }
      };

      req.onreadystatechange = function(e) {
        console.log(this.readyState);
        console.log(this.status);
      };

      req.onerror = function(e) {
        console.log(e);
        console.log(e.target.status +' || '+ e.target.statusText);
      };

      req.send();

      this.proc = this.context.createJavaScriptNode( SAMPLE_SIZE / 2, 1, 1 );
      this.proc.onaudioprocess = function ( e ) {
        _this.update.call( _this, e );
      };
      this.proc.connect( this.context.destination );

      this.fft = new FFT( SAMPLE_SIZE / 2, SAMPLE_RATE );
      this.signal = new Float32Array( SAMPLE_SIZE / 2 );
    }