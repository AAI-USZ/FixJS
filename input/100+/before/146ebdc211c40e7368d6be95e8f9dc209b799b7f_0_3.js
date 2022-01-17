function(){
	$.fitch = {
		score : function() {
			// forwardBackward does a tree traversal for each sequence nucleotide, forwardBackward2 does a sequence traversal for each tree node.
			// Not sure which is faster
			$.fitch.forwardBackward();
			//$.fitch.forwardBackward2();
			var score = $.fitch.scoreRecurse($.stage.current);
			return score;
		},

		getLen : function() {
			return $.phylo.seqLen;
		},
		
		forwardBackward : function() {
			var stage = $.stage.current;
			var len = $.fitch.getLen();
			for(var i=0;i<len;i++) {
				var x = $.fitch.forward(stage,i);
				if(x.length < 1) {
					$.phylo.tree[stage].ancestor[i] = "x";
				}
				else if (x.length == 1 || x.indexOf("x") != 0) { 
					$.phylo.tree[stage].ancestor[i] = x[0];
				}
				else {
					$.phylo.tree[stage].ancestor[i] = x[1];
				}
				if($.phylo.tree[stage].child >= 2) {
					$.fitch.backward($.phylo.tree[stage].node1,$.phylo.tree[stage].ancestor[i],i);
				}
				if($.phylo.tree[stage].child >= 1) {
					$.fitch.backward($.phylo.tree[stage].node2,$.phylo.tree[stage].ancestor[i],i);
				}
			}
			return;			
		},

		forward : function (stage, position) {
			if (position == 0) {
				$.phylo.tree[stage].ancestor = [];
				$.phylo.tree[stage].ancestorSet = [];
			}
			if($.phylo.tree[stage].child == 2) {
				var x = $.fitch.forward($.phylo.tree[stage].node2,position);
				var y = $.fitch.forward($.phylo.tree[stage].node1,position);
				var a = [];
				var b = [];
				for(var i=0;i<x.length;i++) {
					if(a.indexOf(x[i]) == -1)
						a.push(x[i]);
					for(var j=0;j<y.length;j++) {
						if(x[i] == y[j] && b.indexOf(x[i]) == -1)
							b.push(x[i]);
						if(a.indexOf(y[j]) == -1)
							a.push(y[j]);
					}
				}
				if(b.length < 1)
					$.phylo.tree[stage].ancestorSet[position] = a;
				else
					$.phylo.tree[stage].ancestorSet[position] = b;
				
			} else if($.phylo.tree[stage].child == 1) {
				var x = $.fitch.forward($.phylo.tree[stage].node2,position);
				var y = $.sequence.nuc($.sequence.track[$.phylo.tree[stage].node1][position]);
				if(x.indexOf(y) > -1) {
					$.phylo.tree[stage].ancestorSet[position] = [y];
				} else {
					$.phylo.tree[stage].ancestorSet[position] = x.concat([y]);
				}
			} else  {
				var x = $.sequence.nuc($.sequence.track[$.phylo.tree[stage].node1][position]);
				var y = $.sequence.nuc($.sequence.track[$.phylo.tree[stage].node2][position]);
				if(y == x)
					$.phylo.tree[stage].ancestorSet[position] = [x];
			 	else 
					$.phylo.tree[stage].ancestorSet[position] = [x,y];
			}
			return $.phylo.tree[stage].ancestorSet[position];
		},

		backward : function (stage, fixed, i) {
			var x = $.phylo.tree[stage].ancestorSet[i];
			if(x.length < 1) {
				$.phylo.tree[stage].ancestor[i] = "x";
			}
			else if (x.length == 1) { 
				$.phylo.tree[stage].ancestor[i] = x[0];
			}
			else if (x.indexOf(fixed) > -1) {
				$.phylo.tree[stage].ancestor[i] = fixed;
			}
			else if (x.indexOf("x") != 0) {
				$.phylo.tree[stage].ancestor[i] = x[0];
			}
			else {
				$.phylo.tree[stage].ancestor[i] = x[1];
			}
			if($.phylo.tree[stage].child >= 2) {
				$.fitch.backward($.phylo.tree[stage].node1,$.phylo.tree[stage].ancestor[i],i);
			}
			if($.phylo.tree[stage].child >= 1) {
				$.fitch.backward($.phylo.tree[stage].node2,$.phylo.tree[stage].ancestor[i],i);
			}
			return;
		},

		forwardBackward2 : function() {
			var stage = $.stage.current;
			var len = $.fitch.getLen();
			var x = $.fitch.forward2(stage,i);
			for(var i=0;i<len;i++) {
				if(x[i].length < 1) {
					$.phylo.tree[stage].ancestor[i] = "x";
				}
				else if (x[i].length == 1 || x[i].indexOf("x") != 0) { 
					$.phylo.tree[stage].ancestor[i] = x[i][0];
				}
				else {
					$.phylo.tree[stage].ancestor[i] = x[i][1];
				}
			}
			if($.phylo.tree[stage].child >= 2) {
				$.fitch.backward2($.phylo.tree[stage].node1,$.phylo.tree[stage].ancestor);
			}
			if($.phylo.tree[stage].child >= 1) {
				$.fitch.backward2($.phylo.tree[stage].node2,$.phylo.tree[stage].ancestor);
			}
			return;			
		},

		forward2 : function (stage) {
			var len = $.fitch.getLen();
			$.phylo.tree[stage].ancestor = [];
			$.phylo.tree[stage].ancestorSet = [];
			if($.phylo.tree[stage].child == 2) {
				var x = $.fitch.forward2($.phylo.tree[stage].node2);
				var y = $.fitch.forward2($.phylo.tree[stage].node1);
				for(var position=0;position<len;position++) {
					var a = [];
					var b = [];
					for(var i=0;i<x[position].length;i++) {
						if(a.indexOf(x[position][i]) == -1)
							a.push(x[position][i]);
						for(var j=0;j<y.length;j++) {
							if(x[position][i] == y[position][j] && b.indexOf(x[position][i]) == -1)
								b.push(x[position][i]);
							if(a.indexOf(y[position][j]) == -1)
								a.push(y[position][j]);
						}
					}
					if(b.length < 1)
						$.phylo.tree[stage].ancestorSet[position] = a;
					else
						$.phylo.tree[stage].ancestorSet[position] = b;
				}
				
			} else if($.phylo.tree[stage].child == 1) {
				var x = $.fitch.forward2($.phylo.tree[stage].node2);
				var y = $.sequence.nucArray($.sequence.track[$.phylo.tree[stage].node1]);
				for(var position=0;position<len;position++) {
					if(x[position].indexOf(y[position]) > -1) {
						$.phylo.tree[stage].ancestorSet[position] = [y[position]];
					} else {
						$.phylo.tree[stage].ancestorSet[position] = x[position].concat([y[position]]);
					}
				}
			} else  {
				var x = $.sequence.nucArray($.sequence.track[$.phylo.tree[stage].node1]);
				var y = $.sequence.nucArray($.sequence.track[$.phylo.tree[stage].node2]);
				for(var position=0;position<len;position++) {
					if(y == x)
						$.phylo.tree[stage].ancestorSet[position] = [x[position]];
					else 
						$.phylo.tree[stage].ancestorSet[position] = [x[position],y[position]];
				}
			}
			return $.phylo.tree[stage].ancestorSet;
		},
		
		backward2 : function (stage, fixed) {
			var x = $.phylo.tree[stage].ancestorSet;
			var len = $.fitch.getLen()
			for(var i=0;i<len;i++) {
				if(x[i].length < 1) {
					$.phylo.tree[stage].ancestor[i] = "x";
				}
				else if (x[i].length == 1) { 
					$.phylo.tree[stage].ancestor[i] = x[i][0];
				}
				else if (x[i].indexOf(fixed) > -1) {
					$.phylo.tree[stage].ancestor[i] = fixed[i];
				}
				else if (x[i].indexOf("x") != 0) {
					$.phylo.tree[stage].ancestor[i] = x[i][0];
				}
				else {
					$.phylo.tree[stage].ancestor[i] = x[i][1];
				}
			}
			if($.phylo.tree[stage].child >= 2) {
				$.fitch.backward2($.phylo.tree[stage].node1,$.phylo.tree[stage].ancestor);
			}
			if($.phylo.tree[stage].child >= 1) {
				$.fitch.backward2($.phylo.tree[stage].node2,$.phylo.tree[stage].ancestor);
			}
			return;
		},

		scoreRecurse : function(stage) {
			if ($.phylo.tree[stage].child == 0) {
				var a = $.sequence.nucArray($.sequence.track[$.phylo.tree[stage].node1]);
				var b = $.sequence.nucArray($.sequence.track[$.phylo.tree[stage].node2]);
			} else if ($.phylo.tree[stage].child == 1) {
				var a = $.sequence.nucArray($.sequence.track[$.phylo.tree[stage].node1]);
				var b = $.phylo.tree[$.phylo.tree[stage].node2].ancestor;
			} else {
				var a = $.phylo.tree[$.phylo.tree[stage].node1].ancestor;
				var b = $.phylo.tree[$.phylo.tree[stage].node2].ancestor;
			}
			
			function tabulate(a) {
				var weight = {
					match : 1,
					mismatch : -1,
					open : -5,
					extend : -1
				};
				return (a.match		*	weight.match	+
						a.mismatch	*	weight.mismatch	+
						a.open		*	weight.open		+
						a.extend	*	weight.extend);
			}
			
			function trace(arr,seq) {
				var log = {
					match : 0,
					mismatch : 0,
					open : 0,
					extend : 0
				};
				
				for(var i=0;i<arr.length;i++) {
					if (arr[i] == "x") {
						if (seq[i] != "x") {
							if (i != 0 && arr[i-1] == "x") {
								log.extend++;
							}
							else {
								log.open++;
							}
						}
							
					}
					else if (seq[i] == "x") {
						if (i != 0 && (seq[i-1] == "x" && arr[i-1] != "x")) {
							log.extend++;
						}
						else {
							log.open++;
						}
					}
					else if (seq[i] == arr[i] || seq[i] == arr[i]) {
						log.match++;
					}
					else {
						log.mismatch++;
					}
				}
				return log;
			};

			var logA = trace($.phylo.tree[stage].ancestor, a);
			var logB = trace($.phylo.tree[stage].ancestor, b);

			var score = tabulate(logA) + tabulate(logB);

			if ($.phylo.tree[stage].child >= 2) {
				score += $.fitch.scoreRecurse($.phylo.tree[stage].node1);
			}
			if ($.phylo.tree[stage].child >= 1) {
				score += $.fitch.scoreRecurse($.phylo.tree[stage].node2);
			}

			$.phylo.tree[stage].score = score;
			return score;
		},
		
	};
}