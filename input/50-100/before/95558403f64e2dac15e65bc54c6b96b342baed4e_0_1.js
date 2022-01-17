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
	    }