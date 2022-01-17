function (stage, fixed) {
			var x = $.phylo.tree[stage].ancestorSet;
			var len = $.fitch.getLen()
			for(var i=0;i<len;i++) {
				if(x[i].length < 1) {
					$.phylo.tree[stage].ancestor[i] = "x";
				}
				else if (x[i].length == 1) { 
					$.phylo.tree[stage].ancestor[i] = x[i][0];
				}
				else if (x[i].indexOf(fixed[i]) > -1) {
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
		}