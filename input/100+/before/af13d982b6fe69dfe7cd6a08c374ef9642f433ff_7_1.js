function(x) {	

			//$(".row").addClass("current");
			$.engine.deActive();
			$(".row").removeClass("current").removeClass("blocked");
			var show = function(n) {
				var tree = $.phylo.tree[n];
				if(tree.child == 0) {
					$("#row"+tree.node1).show('slide',{direction: 'right'}, 500);
					$("#row"+tree.node2).show('slide',{direction: 'right'}, 500);
				} else if(tree.child == 1) {
					$("#row"+tree.node1).show('slide',{direction: 'right'}, 500);
				}
			};
			var addClass = function(n) {
				var tree = $.phylo.tree[n];
				if(tree.child == 0) {
					$("#row"+tree.node1).removeClass("hidden").addClass("current");
					$("#row"+tree.node2).removeClass("hidden").addClass("current");
				} else if(tree.child == 1) {
					$("#row"+tree.node1).removeClass("hidden").addClass("current");
					addClass(tree.node2);
				} else if(tree.child == 2){
					addClass(tree.node1);
					addClass(tree.node2);
				}
			}
			this.splash(x);
			show(x);
			addClass(x);
			if(x == 0) {
				//window.setTimeout(function() {
					//$("#bg").css({visibility: "visible"});
					$("#bg").show("slide",{direction : "left"},400);
				//},200);
			}
			$(".row").each(function() {
				if($(this).hasClass("hidden") == false && $(this).hasClass("current") == false) {
					$(this).addClass("blocked");
				}
			});
			var x = $.phylo.tree[x];
			$.engine.active();
			$.tree.buildAncestor();
			var tmp = [];
			$.phylo.bestTrack = [];
			for(var i=0;i<8;i++) {
				var t = [];
				for(var j=0;j<25;j++) 
					t.push(0);
				tmp.push(t);
				$.phylo.bestTrack.push(t);
			}
					
			$.helper.copy(tmp, $.sequence.track);
			//var tmp = $.sequence.track.slice(0);
			$.helper.copy($.sequence.track, $.phylo.origin);
			//$.sequence.track = $.phylo.origin.slice(0);
			//set par score
			var par = $.fitch.score();
			$.helper.copy($.sequence.track, tmp);
			//$.sequence.track = tmp.slice(0);
			$.sequence.par = par;
			$.board.par(par);
			var score = $.fitch.score();
			$.board.score(score);
			$.phylo.bestScore = score;
			//
			$.helper.copy($.phylo.bestTrack, $.sequence.track);
			//$.phylo.bestTrack = $.sequence.track.slice(0);
			$.board.bestScore(score);
			$.board.unapprove();
			if($.phylo.bestScore == par) {
				$.board.approve();
			};
		}