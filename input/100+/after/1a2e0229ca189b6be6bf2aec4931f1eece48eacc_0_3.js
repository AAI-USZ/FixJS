function() {
		self._dismissBusy = DialogSystem.showBusy('Adding new reconciliation service');
	    var name = self._elmts.service_name.val();
	    if(name.trim()===""){
	    	alert("Name is required");
	    	self._dismissBusy();
	    	return;
	    }
	    var props = self._elmts.label_prop_container.find('input[name="label_prop"]:checked');
	    var prop_uris = "";
	    for(var i=0;i<props.length;i++){
	    	prop_uris += " " + $(props[i]).val();
	    }
	    if(self._elmts.other_label_chk.attr("checked")){
	    	prop_uris += " " + self._elmts.other_properties_textarea.val();
	    }
	    if(prop_uris===""){
	    	alert("At least one label property should  be provided");
	    	self._dismissBusy();
	    	return;
	    }
	    
	    if (self._elmts.file_source_url.attr('checked')){
	    	var file_url = self._elmts.file_url_input.val();
	    	var file_format = self._elmts.file_format_input.val();
	    	if(file_url.trim()===""){
		    	alert("File URL is required");
		    	self._dismissBusy();
		    	return;
		    }
	    	
	    	var services = ReconciliationManager.getAllServices();
	    	
	    	$.post("command/rdf-extension/addService",
					{"datasource":"file_url","name":name,"url":file_url,properties:prop_uris, "file_format":file_format},
					function(data){
						self._dismissBusy();
						RdfReconciliationManager.registerService(data,self._level);					
			},"json");
	    	return;
	    }
	    
	    self._elmts.hidden_service_name.val(name);
	    self._elmts.hidden_properties.val(prop_uris);
	    
	    self._elmts.file_upload_form.ajaxSubmit({
	    	dataType:  'json',
	    	success: function(data) {
	    		self._dismissBusy();
	    		RdfReconciliationManager.registerService(data,self._level);
			}
		});
	    
	}