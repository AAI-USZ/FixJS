function( e ){
	            	var columnPos = self._setCurrentColumnCollectionOffset(),
	            		colWidth = firstCell.clientWidth;
                          
                    
                  //  console.log( e )      
                                 
                    //console.log( 'half width colHalfWidth ', colHalfWidth)
                    self.dragDisplay
                    	.css( 'left', ( e.pageX - startingColumnOffsetX ) )
                    
                    if( e.pageX  < prevMouseX ){
                    	//move left
							var threshold = columnPos.left;
							
						//	console.log( 'threshold ',threshold,  e.pageX - startingColumnOffsetX )
							if( e.pageX  < threshold ){
								self._swapCol(self.startIndex-1);
							}

						}else{
							//move right
							var threshold = columnPos.left + colWidth ;
							//console.log('move right ', columnPos.left,' ', threshold, ' ', e.pageX, ' ');
							//move to the right only if x is greater than threshold and the current col isn' the last one
							if( e.pageX  > threshold  && colCount != self.startIndex ){
								//console.info('move right');
								self._swapCol( self.startIndex + 1 );
							}
						}
						//update mouse position
						prevMouseX = e.pageX ;
			
                }