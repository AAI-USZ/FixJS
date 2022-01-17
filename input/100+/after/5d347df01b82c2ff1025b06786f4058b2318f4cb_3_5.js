function stopResizing(e){
			if (isResizing) {
				var x = baidu.event.getPageX(e),l = baidu.dom.getPosition(cell).left,colWidth = (x-l),
					refcol=cell.getAttribute("refcol"),
					column=g._getCol(refcol),
					bodycell= baidu.dom.query("[refcol="+refcol+"]",g.ref.gbody),
					t= baidu.dom.query(".gridtable",g.ref.gbody),
					offset = g._getCol(refcol).width-colWidth;
				
				cell.style.width= colWidth+"px";
				
				baidu.array.each(baidu.dom.query("[refcol="+refcol+"]",g.ref.gheader),function(c){
					c.style.width=colWidth+"px";
				});
				
				column.width=colWidth;
				
				baidu.array.each(bodycell,function(cell){
					cell.style.width=colWidth+"px";
				});
				baidu.array.each(t,function(table){
					var tWidth = parseInt(baidu.dom.getStyle(table, "width"), 10);
					table.style.width = (tWidth - offset) + "px";
				});
				g.ref.resizerproxy.style.display="none";
				g._sizeScroller();
				g.dispatchEvent("columnresize",{column:column});
			}
			isResizing=false;
			cell==null;
		}