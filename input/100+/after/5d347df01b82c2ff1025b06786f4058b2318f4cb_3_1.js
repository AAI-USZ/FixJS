function(){
		var g= this,fixColIndex=g.fixColIndex,
			t=baidu.dom.query(".gridtable",g.ref.gbody),
			y=parseInt(baidu.dom.getStyle(g.ref.gbody.parentNode,"height"),10)||g.ref.gbody.parentNode.clientHeight,
			s=g.ref.gheader.style,fixcol=null,
			hdContentWidth = g.ref.gheader.parentNode.offsetWidth-parseInt(baidu.dom.getStyle(g.ref.gheader,"border-left-width"),10)-parseInt(baidu.dom.getStyle(g.ref.gheader,"border-right-width"),10),
		w=hdContentWidth;
		if(fixColIndex!=-1){
			var t = baidu.dom.query(".gridtable",g.ref.gbody);
			for (i = 0, l = g.ref.ghcells.length; i < l; i++) {
				var c=g.ref.ghcells[i],refcol=c.getAttribute("refcol"); 
				if ((!g.columns[refcol].fix) || (!refcol)) {
					w -= c.offsetWidth;
				}else{
					fixcol= c;
				}
			}
			if (fixcol && w>20) {
				w= w- parseInt(baidu.dom.getStyle(fixcol,"border-left-width"),10)- parseInt(baidu.dom.getStyle(fixcol,"border-right-width"),10);
				if (t.length > 0 && t[0].offsetHeight > y && (!g.autoHeight)) {
					w=w-17;
				}
				baidu.dom.setBorderBoxWidth(fixcol,w);
				g.columns[g.fixColIndex].width = w;
				if(g.ref.gbody){
					var fixbodycell = baidu.dom.query("[refcol="+g.fixColIndex+"]",g.ref.gbody);
					baidu.array.each(fixbodycell,function (c){
						baidu.dom.setBorderBoxWidth(fixbodycell[0],w);
					});
				}
			}
		}
	}