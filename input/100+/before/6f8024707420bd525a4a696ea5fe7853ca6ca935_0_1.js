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
		//考虑有表格嵌套的情况，需要对找到的src进行校验
		if(table && (table.parentNode.parentNode == g.ref.gbody || table.parentNode == g.ref.gheader) ){
			return {cell:cell,row:row,table:table,rowIndex:rowIndex,src:src};
		}else{
			return {};
		}
	}