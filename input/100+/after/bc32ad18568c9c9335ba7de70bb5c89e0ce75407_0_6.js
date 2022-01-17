function(item,i) {
											var ateam = item.getElement('span').get('text') 
											if( ateam > response.tid) {
												div.inject(item,'before');
												pdiv.inject(document.id('P'+ateam),'before');
												return false;
											}
											return true;
										}