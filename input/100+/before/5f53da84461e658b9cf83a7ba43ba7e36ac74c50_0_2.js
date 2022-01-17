function( scale, leftBase, rightBase, callback ) {
        var width = ( rightBase - leftBase + 1 ) * scale;
        var trackHeight = 100;
        var globalMax = 1000;
        this._getView( scale )
            .readWigData( this.refSeq.name, leftBase, rightBase, function( features ) {
                var c = dojo.create(
                    'canvas',
                    { height: trackHeight,
                      width: width,
                      innerHTML: 'Canvas-based tracks not supported by this browser'
                    }
                );
                var context = c && c.getContext && c.getContext('2d');
                if( context ) {
                    context.fillText(features.length+' spans', 10,10);
                    context.fillStyle = '#00f';
                    //console.log( 'filling '+leftBase+'-'+rightBase);
                    dojo.forEach(features, function(f) {
                        //console.log( f.get('start')+'-'+f.get('end')+':'+f.get('score') );
                        var rectLeft  = ( f.get('start') - leftBase ) * scale;
                        var rectRight = ( f.get('end')   - leftBase ) * scale;
                        var height = f.get('score')/globalMax * trackHeight;
                        context.fillRect( rectLeft, trackHeight-height, rectRight-rectLeft+1, height );
                    }, this );
                }

                if( ! callback ) {
                    console.error('null callback?');
                }
                else {
                    callback( [c] );
                }
            });
    }