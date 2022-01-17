function(enteredText) {
		//this.enableOrDisableAnimationCallbacks(true,true);
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
	    this.showSaving();
	    var that = this;
	    $.post("/Profile/Update", { "id": id, "field": field, "value": value },
	    function (data) {
	        var resultJson = data;
	        if (resultJson == "Success") {
	        	that.initializeText(enteredText);
	            handleRefresh(id);	            
	        } else {
	        	handleRefresh(id);	
	        	that.initializeText("error!");
	            $('#statusMessage').modal('show');
	            $("#statusMessageHeader").html('<h3 style="color:red">Error!</h3>');
	            $("#statusMessageText").html('<h5>Could not save presentation.</h5>');
	            
	        }
	    });  				
	}