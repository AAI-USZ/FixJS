function(e) {
			if(e.keyCode == '13') {		
				e.preventDefault();
				tempoArray[cont.id] = $(this).val();
				//Get the order array:
				var orderArray = [];
				orderArray.push("");
				//Get the order array
				var row = manifest.obj ? $('#mediaDiv table tbody tr') : $('#contentTable tbody tr');
				row.each(function(){
					if($(this).data('content'))
						orderArray.push($(this).data('content'));
				});
				//Rearrange the orderArray
				var tempCont;
				for(var id in tempoArray) {
					var newIndex = tempoArray[id];
					//Check if the index is in the range
					if(newIndex > 0 && newIndex < orderArray.length && !isNaN(newIndex)) { 
						//Get old index
						for(var oldIndex = 1; oldIndex < orderArray.length; oldIndex++) {
							if(orderArray[oldIndex].id == id) {
								tempCont = orderArray[oldIndex]; 
								break;
							}
						}
						//Now we have a new index (newIndex) and an old (oldIndex)
						//content should now be inserted in orderArray at newIndex and removed from oldIndex
						orderArray.splice(oldIndex, 1); 				//Remove
						orderArray.splice(newIndex, 0, tempCont); 	//Add
					}
				}
				//Need to repopulate the page with the order of orderArray
				var table = quiz ? $('#mediaDiv table')[0] : $('#contentTable')[0];
				for(var j = table.rows.length - 1; j > 0; j--) {
					table.deleteRow(j);
				}
				manifest.ordernum = 0;
				for(var p = 1; p < orderArray.length; p++)  {
					manifest.addContent(orderArray[p]);
				}	
				manifest.tmpOrder = [];
			}
		}