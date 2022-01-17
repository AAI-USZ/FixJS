function(url,data,callback,fallback)
	{
	    /* Make a get request to Google Reader */
        $.ajax({
	      method: "get",
	      url: url,
	      data : data,
		  dataType : "json",
	      success: callback,
	      timeout: (15 * 1000),
	      statusCode : {
		        		    401 : function(){
		      			    	console.log("Authorization failure. Access_token expired.");
			    		    	GoogleReader.refreshAccessToken(function(result){
								console.log("Final Result : " + result);
								if(result == "OK")
									GoogleReader.getData(url,data,callback);
								
								});
		    		    	}
		  },
	      error: function( xhr, ajaxOptions, errorStr ){
				console.log("Error : " + errorStr);
				console.log(xhr.status);
				if(fallback)
					fallback(errorStr);
		    } 
	    });  
	}