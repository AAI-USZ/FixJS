function (dataSet) {
		
		$('#tablet_tree').empty();
		_this = this;	
			var htmlString ="";
			for (var dataSetKey in TissueStack.dataSetStore.datasets) {
				var dataSet = TissueStack.dataSetStore.datasets[dataSetKey];
				  htmlString += '<div data-role="collapsible"'+' id="tabletTreeDiv-'+ dataSet.local_id + dataSet.host +'">' + '<h3>'+ dataSet.local_id + 
				  				' in ' + dataSet.host +'</h3>'+
								'<p>'+ dataSet.description +'<br>'+ 'Location: '+ dataSet.filename +'</p>'+
								'<fieldset data-role="controlgroup" data-mini="true">'+
								'<input type="radio" name="radio-' + dataSet.local_id + '"'+' id="radio-'+ dataSet.local_id +'"'+' value="on" />'+
								'<label for="radio-'+ dataSet.local_id +'"'+'>Overlay ON</label>'+
								'<input type="radio" name="radio-' + dataSet.local_id + '"'+' id="radio-off-'+ dataSet.local_id +'"'+' value="off" />'+
								'<label for="radio-off-'+ dataSet.local_id + '"'+'>Overlay OFF</label>'+
								'</fieldset></div>';
																											
			}
			$('#tablet_tree').append(htmlString);
			$("#tablet_tree").trigger("create");
			if(TissueStack.tablet){
				$("#tabletTreeDiv-1localhost").trigger('expand'); //EXPAND FIRST LOACLHOST  DATASET
			}
			_this.getSelectedTabletTree(dataSet);
	}