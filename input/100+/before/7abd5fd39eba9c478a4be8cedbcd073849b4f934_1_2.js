function(e) {
			if(e.keyCode == '13') {		
				e.preventDefault();
				tempoArray[cont.id] = $(this).val();
				//Rearrange the orderArray
				var tempCont;
				for(var id in tempoArray) {
					var newIndex = tempoArray[id];
					//Check if the index is in the range
					if(newIndex > 0 && newIndex < originalArray.length && !isNaN(newIndex)) { 
						//Get old index
						for(var oldIndex = 1; oldIndex < originalArray.length; oldIndex++) {
							if(originalArray[oldIndex].id == id) {
								tempCont = originalArray[oldIndex]; 
								break;
							}
						}
						//Now we have a new index (newIndex) and an old (oldIndex)
						//content should now be inserted in originalArray at newIndex and removed from oldIndex
						originalArray.splice(oldIndex, 1); 				//Remove
						originalArray.splice(newIndex, 0, tempCont); 	//Add
					}
				}
				//Need to repopulate the page with the order of originalArray
				var table = quiz ? $('#mediaDiv table')[0] : $('#contentTable')[0];
				for(var j = table.rows.length - 1; j > 0; j--) {
					table.deleteRow(j);
				}
				manifest.ordernum = 0;
				for(var p = 1; p < originalArray.length; p++)  {
					manifest.addContent(originalArray[p]);
				}	
				manifest.orderArray = [];
				manifest.tmpOrder = [];
			}
		}