function() {
		var _this = this;
		var url = "http://" + _this.domain + "/backend/data/" + _this.data_set_id;
		
		// create a new data store
		TissueStack.dataSetStore = new TissueStack.DataSetStore(null, true);
		
		TissueStack.Utils.sendAjaxRequest(
			url, 'GET',	true,	
			function(data, textStatus, jqXHR) {
				if (!data.response && !data.error) {
					_this.writeErrorMessageIntoDiv("Did not receive anyting from backend, neither success nor error ....");
					return;
				}
				
				if (data.error) {
					var message = "Application Error: " + (data.error.message ? data.error.message : " no more info available. check logs.");
					_this.writeErrorMessageIntoDiv(message);
					return;
				}
				
				if (data.response.noResults) {
					_this.writeErrorMessageIntoDiv("No data set found in configuration database for given id");
					return;
				}
				
				var dataSet = data.response;
				// add to data store
				dataSet = TissueStack.dataSetStore.addDataSetToStore(dataSet, _this.domain);
				
				if (!dataSet.data || dataSet.data.length == 0) {
					this.writeErrorMessageIntoDiv("Data set '" + dataSet.id + "' does not have any planes associated with it!");
					return; 
				}

				// create the HTML necessary for display and initialize the canvas objects
				_this.createHTMLForDataSet(dataSet, _this.include_cross_hair);
				_this.adjustCanvasSizes();
				_this.initCanvasView(dataSet, _this.use_image_service);
				// if we have more than 1 plane => register the maximize events
				if (dataSet.data.length > 1) {
					_this.registerMaximizeEvents();
				}
			},
			function(jqXHR, textStatus, errorThrown) {
				_this.writeErrorMessageIntoDiv("Error connecting to backend: " + textStatus + " " + errorThrown);
			}
		);
	}