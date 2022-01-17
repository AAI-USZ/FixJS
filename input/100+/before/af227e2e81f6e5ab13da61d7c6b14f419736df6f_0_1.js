function ( path ) {
      var
        req = new XMLHttpRequest(),
        _this = this;

      req.open( 'GET', 'http://storage1.newjamendo.com/tracks/318689_96.mp3', true );
      req.responseType = 'arraybuffer';

      if(req.status == 200) {
        console.log('status 200');
      }

      req.onload = function () {
        console.log(req.response + ' || ' + this.status);
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

      req.onerror = function(e) {
        console.log("Une erreur " + e.target.status + " s'est produite au cours de la réception du document.");
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