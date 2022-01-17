function deleteRow(tableID, row, div) {		
	//delete the combo row
   	var table = document.getElementById(tableID);
   	var rowCount = table.rows.length;
   	for(var i=1; i<rowCount; i++){
   		var riga = table.rows[i];
   		if(null!=riga){
   	        var select = riga.cells[1].childNodes[0];                
   	        if(select.id=="widget_"+row){
   	        	//destroy the dojo element
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