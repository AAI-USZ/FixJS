function(e) {
								e.stop();
								if(!lock.checked) {
									var team=this;
									var addTiC = new MBB.req('addtic.php', function (response) {
										var div = makeTeam(response.tid);
										if($$('#tic div').every(function(item,i) {
											if(item.getElement('span').get('text') > response.tid) {
												div.inject(item,'before');
												return false;
											}
											return true;
										})) {
											$('tic').adopt(div);
										} 
										team.getParent().dispose();
									});
									addTiC.get({'cid':params.cid,'tid':team.get('text')});
								} else {
									$('lock_cell').highlight('#F00');
								}
							}