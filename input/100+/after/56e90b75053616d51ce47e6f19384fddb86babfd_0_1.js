function( features ) {
                if(! this.yscale )
                    this.makeWiggleYScale();

                var c = dojo.create(
                    'canvas',
                    { height: canvasHeight,
                      width:  canvasWidth,
                      style: { cursor: 'default' },
                      innerHTML: 'Your web browser cannot display this type of track.'
                    }
                );
                c.startBase = leftBase;
                var context = c && c.getContext && c.getContext('2d');
                if( context ) {
                    var toY = dojo.hitch( this, this.scale.toY, c.height );
                    var originY = toY( this.scale.origin );

                    //context.fillText(features.length+' spans', 10,10);
                    //console.log( 'filling '+leftBase+'-'+rightBase);
                    var pixelScores = new Array( c.width );
                    dojo.forEach(features, function(f) {
                        //console.log( f.get('start') +'-'+f.get('end')+':'+f.get('score') );
                        var score = f.get('score');
                        var rTop = toY( score );
                        if( rTop <= canvasHeight ) {
                            var rWidth = Math.ceil(( f.get('end') - f.get('start') + 1 ) * scale );
                            var rLeft  = Math.floor(( f.get('start')-1 - leftBase ) * scale );
                            this._updatePixelScores( pixelScores, rLeft, rWidth, score );
                            if( rTop <= originY ) {
                                // bar goes upward
                                context.fillStyle = posColor;
                                context.fillRect( rLeft, rTop, rWidth, originY-rTop);
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
                    }, this );

                    // draw the variance_band if requested
                    if( this.config.variance_band ) {
                        var stats = this.store.getGlobalStats();
                        if( stats && ('mean' in stats) && ('stdDev' in stats) ) {
                            var drawVarianceBand = function( plusminus, fill, label ) {
                                context.fillStyle = fill;
                                var varTop = toY( stats.mean + plusminus );
                                var varHeight = toY( stats.mean - plusminus ) - varTop;
                                varHeight = Math.max( 1, varHeight );
                                context.fillRect( 0, varTop, c.width, varHeight );
                                context.font = '12px sans-serif';
                                if( plusminus > 0 ) {
                                    context.fillText( '+'+label, 2, varTop );
                                    context.fillText( '-'+label, 2, varTop+varHeight );
                                }
                                else {
                                    context.fillText( label, 2, varTop );
                                }
                            };
                            drawVarianceBand( 2*stats.stdDev, 'rgba(0,0,0,0.12)', '2σ' );
                            drawVarianceBand( stats.stdDev, 'rgba(0,0,0,0.25)', '1σ' );
                            drawVarianceBand( 0, 'rgba(255,255,0,0.7)', 'mean' );
                        }
                    }

                    var scoreDisplay = dojo.create(
                        'div', {
                            className: 'wiggleValueDisplay',
                            style: {
                                position: 'absolute',
                                display: 'none',
                                top: 0,
                                left: 0,
                                zIndex: 15
                            }
                        }, block );
                    var verticalLine = dojo.create( 'div', {
                            className: 'trackVerticalPositionIndicator',
                            style: {
                                position: 'absolute',
                                top: 0,
                                display: 'none',
                                cursor: 'default',
                                left: '-2px',
                                height: c.height+'px',
                                width: '1px',
                                borderWidth: '0',
                                zIndex: 15
                            }
                    }, block);
                    var outTO;
                    on( c, 'mousemove', function(evt) {
                            if( outTO ) {
                                window.clearTimeout( outTO );
                                outTO = null;
                            }
                            var x = ( evt.offsetX || evt.layerX )-3;
                            verticalLine.style.display = 'block';
                            verticalLine.style.left = x+'px';

                            var score = pixelScores[x];
                            if( typeof score == 'number' ) {
                                scoreDisplay.innerHTML = score;
                                scoreDisplay.style.left = x+'px';
                                scoreDisplay.style.display = 'block';
                            } else {
                                scoreDisplay.style.display = 'none';
                            }
                    });
                    on( c, 'mouseout', function(evt) {
                            outTO = window.setTimeout( function() {
                                console.log('out');
                                scoreDisplay.style.display = 'none';
                                verticalLine.style.display = 'none';
                            }, 50 );
                    });
                    on( c, 'mousein', function(evt) {
                                scoreDisplay.style.display = 'block';
                                verticalLine.style.display = 'block';
                    });
                }

                this.heightUpdate( c.height, blockIndex );
                c.className = 'canvas-track';
	        if (!(c.parentNode && c.parentNode.parentNode)) {
                    c.style.position = "absolute";
                    c.style.left = (100 * ((c.startBase - leftBase) / blockWidth)) + "%";
                    switch (this.config.align) {
                    case "top":
                        c.style.top = "0px";
                        break;
                    case "bottom":
                    default:
                        c.style.bottom = this.trackPadding + "px";
                        break;
                    }
                    block.appendChild(c);
	        }
            }