function(e) {
								e.stop();
								if(!lock.checked) {
									var addAll = new MBB.req('addalltic.php', function (response) {
										var teams = response.teams;
										$('tnic').empty();
										var tic = $('tic').empty();
										teams.each(function(team,i) {	
											tic.adopt(makeTeam(team));
										});
									});
									addAll.get({'cid':params.cid});
								} else {
									$('lock_cell').highlight('#F00');
								}
							}