function(){
		for(t in tables){		
			var t = tables[t], i, mw=0;				
			t.removeClass(SIGNATURE);						//firefox doesnt like layout-fixed in some cases
			if (t.w != t.width()) {							//if the the table's width has changed
				t.w = t.width();							//its new value is kept
				for(i=0; i<t.ln; i++) mw+= t.c[i].w;		//the active cells area is obtained
				//cell rendering is not as trivial as it might seem, and it is slightly different for
				//each browser. In the begining i had a big switch for each browser, but since the code
				//was extremelly ugly now I use a different approach with several reflows. This works 
				//pretty well but it's a bit slower. For now, lets keep things simple...   
				for(i=0; i<t.ln; i++) t.c[i].css("width", M.round(1000*t.c[i].w/mw)/10 + "%").l=true; 
				//c.l locks the column, telling us that its c.w is outdated									
			}
			syncGrips(t.addClass(SIGNATURE));
		}
	}