function(e){
		if(!e){return {};}
		var g=this,src=e.srcElement||e.target,cell=null,row=null,table=null,o = src,rowIndex=-1;
		while(o.parentNode && o!=g.element){
			if(baidu.dom.hasClass(o,"gridcell")){cell=o;}
			if(o.className.indexOf("gridrow")!=-1){
				row=o;
				rowIndex=o.getAttribute("rowindex");
				if(typeof(rowIndex)!="undefined") rowIndex = parseInt(rowIndex,10);
			}
			if(o.className.indexOf("gridtable")!=-1){table=o;}
			if(cell && row  && table ){break;}
			o=o.parentNode;
		}
		return {cell:cell,row:row,table:table,rowIndex:rowIndex,src:src};
	}