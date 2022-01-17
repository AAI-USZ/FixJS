function() {
                Dancer.addPlugin( 'waveform', function( canvasEl, options ) {
                  options = options || {};
                  var
                    ctx     = canvasEl.getContext( '2d' ),
                    h       = canvasEl.height,
                    w       = canvasEl.width,
                    width   = options.width || ( Dancer.isSupported() === 'flash' ? 2 : 1 ),
                    spacing = options.spacing || 0,
                    count   = options.count || 1024;
                
                  ctx.lineWidth   = options.strokeWidth || 1;
                  ctx.strokeStyle = options.strokeStyle || "white";
                
                  this.bind( 'update', function() {
                    var waveform = this.getWaveform();
                    ctx.clearRect( 0, 0, w, h );
                    ctx.beginPath();
                    ctx.moveTo( 0, h / 2 );
                    for ( var i = 0, l = waveform.length; i < l && i < count; i++ ) {
                      ctx.lineTo( i * ( spacing + width ), ( h / 2 ) + waveform[ i ] * ( h / 2 ));
                    }
                    ctx.stroke();
                    ctx.closePath();
                  });
                
                  return this;
                });
                Dancer.addPlugin( 'fft', function( canvasEl, options ) {
                  options = options || {};
                  var
                    ctx     = canvasEl.getContext( '2d' ),
                    h       = canvasEl.height,
                    w       = canvasEl.width,
                    width   = options.width || 1,
                    spacing = options.spacing || 0,
                    count   = options.count || 512;
                
                  ctx.fillStyle = options.fillStyle || "white";
                
                  this.bind( 'update', function() {
                    var spectrum = this.getSpectrum();
                    ctx.clearRect( 0, 0, w, h );
                    for ( var i = 0, l = spectrum.length; i < l && i < count; i++ ) {
                      ctx.fillRect( i * ( spacing + width ), h, width, -spectrum[ i ] * h );
                    }
                  });
                
                  return this;
                });
                
                self.loadSong('/api/files/03%20Hearing%20Damage%20-%20Thom%20Yorke.mp3');
                
            }