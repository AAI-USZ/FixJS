function(enteredText) {
		//this.enableOrDisableAnimationCallbacks(true,true);
		var oldText = $(this).val();
		var id = this.dom.attr("data-submit-id");
		var submitField = this.dom.attr("class");
		var field = "";
		var value = enteredText;
	    var field = "";
	    if (submitField == 'titleValue editInPlace-active') {
	        field = "Title";
	    } else if (submitField == 'tagsValue editInPlace-active') {
	        field = "Tags";
	    } else {
	        field = "Description";
	    }
	    var that = this;
	    $.post("/Profile/Update", { "id": id, "field": field, "value": value },
	    function (data) {
	        var resultJson = data;
	        if (resultJson == "Success") {
	        	that.initializeText(enteredText);
	            handleRefresh(id);	            
	        } else {
	            $('#statusMessage').modal('show');
	            $("#statusMessageHeader").html('<h3 style="color:red">Error!</h3>');
	            $("#statusMessageText").html('<h5>Could not save presentation.</h5>');
	            that.initializeText(oldText);
	        }
	    });  		
		// var data = this.settings.update_value + '=' + encodeURIComponent(enteredText) 
		// 	+ '&' + this.settings.element_id + '=' + this.dom.attr("id") 
		// 	+ ((this.settings.params) ? '&' + this.settings.params : '')
		// 	+ '&' + this.settings.original_html + '=' + encodeURIComponent(this.originalValue) /* DEPRECATED in 2.2.0 */
		// 	+ '&' + this.settings.original_value + '=' + encodeURIComponent(this.originalValue);
		
		// this.enableOrDisableAnimationCallbacks(true, false);
		// this.didStartSaving();
		// var that = this;
		// $.ajax({
		// 	url: that.settings.url,
		// 	type: "POST",
		// 	data: data,
		// 	dataType: "html",
		// 	complete: function(request){
		// 		that.didEndSaving();
		// 	},
		// 	success: function(html){
		// 		var new_text = html || that.settings.default_text;
				
		// 		/* put the newly updated info into the original element */
		// 		// FIXME: should be affected by the preferences switch
		// 		that.dom.html(new_text);
		// 		// REFACT: remove dom parameter, already in this, not documented, should be easy to remove
		// 		// REFACT: callback should be able to override what gets put into the DOM
		// 		that.triggerCallback(that.settings.success, html);
		// 	},
		// 	error: function(request) {
		// 		that.dom.html(that.originalHTML); // REFACT: what about a restorePreEditingContent()
		// 		if (that.settings.error)
		// 			// REFACT: remove dom parameter, already in this, not documented, can remove without deprecation
		// 			// REFACT: callback should be able to override what gets entered into the DOM
		// 			that.triggerCallback(that.settings.error, request);
		// 		else
		// 			that.reportError("Failed to save value: " + request.responseText || 'Unspecified Error');
		// 	}
		// });
	}