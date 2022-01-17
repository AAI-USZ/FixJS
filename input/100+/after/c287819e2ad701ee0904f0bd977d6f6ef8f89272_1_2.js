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
	      /*statusCode : {
		        		    401 : function(){
		      			    	console.log("Authorization failure. Access_token expired.");
			    		    	GoogleReader.refreshAccessToken(function(result){
								console.log("Final Result : " + result);
								if(result == "OK")
									GoogleReader.getData(url,data,callback);
								
								});
		    		    	}
		  },*/
	      error: function( xhr, ajaxOptions, errorStr ){
				console.log("Error : " + errorStr);
				console.log(xhr.status);
				if(xhr.status == 401 || xhr.status == 400)
				{
					console.log("Authorization failure. Access_token expired.");
					/* Facing errors even after 5 retries. Return .*/
					if(GoogleReader.retries > 5){
						if(fallback) fallback();
						return;
					}
					/* Make one more attempt to fetch the tokens.*/
					GoogleReader.retries++;
					GoogleReader.refreshAccessToken(function(result){
						console.log("Final Result : " + result);
						if(result == "OK")
						{
							GoogleReader.retries = 0;
							GoogleReader.getData(url,GoogleReader.updateData(data),callback);
						}
					});
				}
				else if(fallback)
					fallback(errorStr);
		    } 
	    });  
	}