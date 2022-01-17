function() {
			$("#volumeOff").hide();
			$("#volumeOn").click(function() {
				$("#volumeOn").hide();
				$("#volumeOff").show();
			});
			$("#volumeOff").click(function() {
				$("#volumeOff").hide();
				$("#volumeOn").show()
			});
			$("#cycle").click(function(){
				$.helper.copy($.sequence.track, $.phylo.bestTrack);
				//$.sequence.track = $.phylo.bestTrack.slice(0);
				$.board.score($.phylo.bestScore);
				$.physics.snapRandom();
				if($.phylo.bestScore >= $.sequence.par)
					$.board.approve();
				
			});
			$("#star").click(function(){
				if($(this).hasClass("pass")) {
					$.stage.round();
				}
			});
			$.timer.start();
		}