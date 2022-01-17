function(event){
						//create guidelines
						winSize=document.getScrollSize();

						//console.log(winSize);

						xGuideLineX = new Element('div', {
						    'id': 'xGuideLineX',
						    'class': 'xGuideLine',
							styles: {
						    	width: winSize.x +'px'
						    }						    
						});
						xGuideLineY = new Element('div', {
						    'id': 'xGuideLineY',
						    'class': 'xGuideLine',
							styles: {
						    	height: winSize.y +'px'
						    }					
						});								
						
						xGuideLineX.inject(document.body);
						if(document.body.getElement('#contentContainer.xCentered') && !(el.hasClass('xFixed'))) {				
							xGuideLineY.inject(document.body.getElement('#contentContainer'));
						} else {
							xGuideLineY.inject(document.body);
						}
						self.drawGuideLines(el, xGuideLineX, xGuideLineY);	
					}