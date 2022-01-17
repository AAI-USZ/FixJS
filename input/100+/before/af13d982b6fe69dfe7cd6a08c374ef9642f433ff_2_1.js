function(e) {
										$("#red"+id).hide("fast");
										$.events.untouch(document, "move");
										$.events.untouch(document, "end");
										$.physics.snap();
										var score = $.fitch.score();
										$.board.score(score);
										if($.phylo.bestScore < score) {
											$.phylo.bestScore = score;
											$.helper.copy($.phylo.bestTrack, $.sequence.track);
											//$.phylo.bestTrack = $.sequence.track.slice(0);
											$.board.bestScore(score);
										}
										if(score >=$.sequence.par){
											$.board.approve();
											//$.stage.round();
										} else {
											$.board.unapprove();
										}
									}