function(f) {
                        //console.log( f.get('start') +'-'+f.get('end')+':'+f.get('score') );
                        var score = f.get('score');
                        var rTop = toY( score );
                        if( rTop <= canvasHeight ) {
                            var rWidth = Math.ceil(( f.get('end') - f.get('start') + 1 ) * scale );
                            var rLeft  = Math.floor(( f.get('start')-1 - leftBase ) * scale );
                            if( rTop <= originY ) {
                                // bar goes upward
                                context.fillStyle = posColor;
                                context.fillRect( rLeft, rTop, rWidth, originY-rTop);
                                this._updatePixelScores( pixelScores, rLeft, rWidth, score );
                                if( !disableClipMarkers && rTop < 0 ) { // draw clip marker if necessary
                                    context.fillStyle = clipColor || negColor;
                                    context.fillRect( rLeft, 0, rWidth, 2 );
                                }
                            }
                            else {
                                // bar goes downward
                                context.fillStyle = negColor;
                                context.fillRect( rLeft, originY, rWidth, canvasHeight-rTop );
                                if( !disableClipMarkers && rTop >= canvasHeight ) { // draw clip marker if necessary
                                    context.fillStyle = clipColor || posColor;
                                    context.fillRect( rLeft, canvasHeight-3, rWidth, 2 );
                                }
                            }
                        }
                    }