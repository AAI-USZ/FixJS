function deleteRow(tableID, row, div, rowCountId) {		
	//delete the combo row
   	var table = document.getElementById(tableID);
   	var rowCount = table.rows.length;
   	for(var i=1; i<rowCount; i++){
   		var riga = table.rows[i];
   		if(null!=riga){
   			if(riga.id=="_selectRow"+rowCountId){
   				var selectDijit = dijit.byId(row);
   	        	if (selectDijit) {
   	        		selectDijit.destroy();
   	        	}
   	        	dojo.destroy(row);
   				table.deleteRow(i);
   			}
   		}
   	}   	
   	//remove the div into the body
   	removeGrid(div);   	
   	
}