function(jqXHR, textStatus, errorThrown) {
    	  var errorData = {};
    	  $("#loading").hide();
    	  
    	  try {
    		  errorData = JSON.parse(jqXHR.responseText);
    	  } catch (e) {}
    	  
    	  alert("An error occured: " + errorData.message || errorThrown + "\n\rPlease indicate if this error is relevant to your expected result. If yes, please try again or contact the administrator of this service.");
      }