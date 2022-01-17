f				var id = $(this).attr("id");
				var left = parseInt(domCache[id].left)-1;
				var pos = parseInt(left/$.phylo.x);
			//	if(left%$.phylo.x >= ($.phylo.x/2)) {
				if($.sequence.calcPos(pos)-left <= 0) {
					pos+=1;
				}
				domCache[id].left = $.sequence.calcPos(pos)+"px";//(pos*$.phylo.x)+"px";
				track[getGridY(id)][pos] = id; 
			});
