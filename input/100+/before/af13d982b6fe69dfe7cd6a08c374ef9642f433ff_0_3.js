function() {
	var doc = document, win = window;
	$.board = {
		build : function() {
			var str = "";
			for(var i=0;i<10;i++) {
				str+="<div class='bgRow'>";
				for(var j=0;j<25;j++) {
					str+="<div class='bgCell' style='left:"+$.sequence.calcPos(j)+"px'></div>";	
				}
				str+="</div>";
			}				
			
			$("#gameBoard").html("<div id='bg'>"+str+"</div>");
			
		},	
		score : function(x) {
			$("#userScore").html("Score: "+ x);
		},
		bestScore : function(x) {
			$("#bestScore").html("Best: "+ x);
		},
		par : function(x) {
			$("#parScore").html("Par: "+ x);
		},
		startListener: function() {
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
		},
		approve : function() {
			$("#star").addClass("pass");
			$("#star").animate({
				opacity: 1
			},300, function(){
				$("#star").animate({
					opacity: 0.2
				},300,function() {
					$("#star").animate({
						opacity: 1
					},500,function() {
						$("#star").animate({
							opacity: 0.2
						},300,function() {
							$("#star").animate({
								opacity: 1
							},500,function(){

							});	
						});	
					});
				});
			});
		},
		unapprove : function() {
			$("#star").removeClass("pass");
			$("#star").css({
				opacity : 0.4
			});
		}
	};	
}