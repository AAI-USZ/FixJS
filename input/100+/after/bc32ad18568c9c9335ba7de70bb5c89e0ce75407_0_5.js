function (response) {
										var div = makeTeam(response.tid);
										var pdiv = makePlayoffDiv(response.tid);
										//go down tics looking for first div with team name greater than
										//ours and inject before it
										if($$('#tic div').every(function(item,i) {
											var ateam = item.getElement('span').get('text') 
											if( ateam > response.tid) {
												div.inject(item,'before');
												pdiv.inject(document.id('P'+ateam),'before');
												return false;
											}
											return true;
										})) {
											$('tic').adopt(div);
											document.id('pop').adopt(pdiv);
										} 
										team.getParent().dispose();
									}