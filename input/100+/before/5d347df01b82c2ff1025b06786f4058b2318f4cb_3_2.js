function(data){
		var g=this;
		if(!g.dispatchEvent("beforeload",data)){return ;}
		if(typeof(g.onBeforeLoad)=="function") g.onBeforeLoad({},data);
		var rows=data.data.list||[],arr=[" border='0' cellspacing='0' cellpadding='0' ><tbody>"],cols = g.columns,realColumnsLength=0;
		g.data=data;
		g.selectedRows=[];//clear selections
				
		
		arr.push("<tr>");
		for(var j=0,ll=cols.length;j<ll;j++){
			var col= cols[j],w=col.width;
			if (!col.columns) {
				arr.push("<td refcol='" + j + "' style='width:" + w + "px;height:0px; border-bottom-width:0px;" + (col.hide ? "display:none;" : "") + "' ></td>");
				realColumnsLength++;
			}else{
				for(var subi=0,subl=col.columns.length;subi<subl;subi++){
					realColumnsLength++;
					var subcol = col.columns[subi],w=subcol.width;
					arr.push("<td refcol='" + j+"-"+subi + "' style='width:" + w + "px;height:0px; border-bottom-width:0px;" + (subcol.hide ? "display:none;" : "") + "' ></td>");
				}
			}
		}
		arr.push("</tr>");
		for(var i=0,l=rows.length;i<l;i++){
			var row=rows[i],select=((!!g.selectMode) && (!!g.selectBy));//是否选中
			if(select){
				if(baidu.lang.isString(g.selectBy)){
					select = (row[g.selectBy]=="1" || row[g.selectBy]==true);
				}
				if(baidu.lang.isFunction(g.selectBy)){
					select  = g.selectBy({rowdata:row,rowIndex:i});
					select = (select=="1" || select==true);
				}
			}
			if(select){
				if (g.selectedRows.length >= 1 && g.selectMode == 1) {//单选
					select = false;
				}else {
					g.selectedRows.push(i);
				}
			}
			//beginrowjoin and the performance????
			g.dispatchEvent("beginrowjoin",{realColumnsLength:realColumnsLength,rowdata:row,rowIndex:i,joinedArray:arr});
			arr.push("<tr rowindex="+i+"   class=' gridrow "+(g.strip===false?"":(i%2?"even":"odd"))+" "+(select?"selected":"")+" '>");
			for(var j=0,ll=cols.length;j<ll;j++){
				var col= cols[j];
				if (!col.columns) {
					arr.push("<td class='gridcell' nowrap='nowrap' style='" + (col.hide ? "display:none;" : "") + "'><span class='cellcontent' style='text-align:" + (col.align || "left") + ";' > " + g._getCellContent(col,i,{select:select}) + "</span></td>");
				}else{
					for(var subi=0,subl=col.columns.length;subi<subl;subi++){
						var subcol = col.columns[subi];
						arr.push("<td class='gridcell' nowrap='nowrap' style='" + (subcol.hide ? "display:none;" : "") + "'><span class='cellcontent' style='text-align:" + (subcol.align || "left") + ";' > " + g._getCellContent(subcol,i,{select:select}) + "</span></td>");
					}
				}
			}
			arr.push("</tr>");
			//endrowjoin and the performance????
			g.dispatchEvent("endrowjoin",{realColumnsLength:realColumnsLength,rowdata:row,rowIndex:i,joinedArray:arr});
		}
		g.dispatchEvent("endrowsjoin",{joinedArray:arr});
		arr.push("</tbody></table></div>");
		arr.unshift("<div class='grid-tablecontainer'><table class='gridtable' style='width:"+g.ref.gheader.childNodes[0].clientWidth+"px' ");
		g.ref.gbody.innerHTML=arr.join("");
		this.setSize();
		//pager
		if(g.page && g._useDefaultPager){
			if(!data.data.page)data.data.page={};
			data.data.page.total=parseInt(data.data.page.total,10);//parse into number
			g.page.total= parseInt(data.data.page.total||Math.max(rows.length,g.page.total,10));//如果server端没有返回total，尝试是否有缓存(在翻页时可以缓存总记录条数)
			var p  = g.ref.pager,c= g.page.curPage,
			pages= parseInt((data.data.page.total-1)/g.page.perPage,10)+1,
			from = Math.max((g.page.curPage-1)*g.page.perPage+1,1),
			to= Math.min((g.page.curPage)*g.page.perPage,data.data.page.total);
			p.first.disabled = (c<=1 || pages<=1);
			p.prev.disabled = (c<=1 || pages<=1);
			p.curPage.value =c;
			p.pages.innerHTML =pages;
			p.next.disabled = (c>=pages || pages<=1);
			p.last.disabled = (c>=pages || pages<=1);
			p.from.innerHTML =from;
			p.to.innerHTML =to;
			p.total.innerHTML =data.data.page.total;
		
			//remember the data 
			g.page.pages=pages;
			g.page.from=from;
			g.page.to=to;
			g.page.total=data.data.page.total;
			
		}
		g._webkit();
		g.dispatchEvent("afterload",data);
		if(typeof(g.onAfterLoad)=="function") g.onAfterLoad({},data);
	}