function gbodyClick(e,data){
			var s=g._getSrc(e);
			if(s.cell){//cell clicked
				//columnIndex 在table中是第几列 从0开始
				//refIndex 在grid.optoins.columns中的下标
				var columnIndex =-1,siblings=s.cell.parentNode.childNodes,refIndex=-1;
				for(var i=0,l=siblings.length;i<l;i++){
					if(siblings[i]==s.cell) {columnIndex=i;break;}
				}
				refIndex= parseInt(s.table.rows[0].cells[columnIndex].getAttribute("refcol"),10);
				var data ={columnIndex:columnIndex,refIndex:refIndex,rowIndex:s.rowIndex,ref:s,column:g._getCol(refIndex)};
				
				//约定先dispatchEvent然后执行onxxx选项事件
				g.dispatchEvent("cellclick",data);
				if(typeof(g.onCellClick)=="function") g.onCellClick(e,data);
				
			}
			if(s.row){//row clicked
				var data = {rowIndex:s.rowIndex,row:g.data.data.list[s.rowIndex],ref:s};
				g.dispatchEvent("rowclick",data);
				if(typeof(g.onRowClick)=="function") g.onRowClick(e,data);
				if(g.clickToSelect!==false)g.toggleSelectRow(s.rowIndex,e);
				g._webkit();
			}
			
		}