function(query,category,automatic) {

	if(automatic !== undefined) {
		automatic = 1;
	} else {
		automatic = 0;
	}

	var serverURL = "/cofetch/get"
		          + "/" + $.trim(query)
		          + "/" + encodeURIComponent(category)
		          + "/" + automatic;
	
    console.log('Waiting for results for query "' + query + '"');
    $("#loading").show();
    
    //Reset scraper data
    scraperData = [];
    
    //Request our data
    $.ajax({
      url: serverURL,
      dataType: "jsonp",
      jsonpCallback: "_cofetchcb",
      timeout: 1000000,
      success: function(data) {
	    
        if(automatic === 1) {
        	
        	var dialogHtml = '';
        	//Store the returned data
    	    scraperData = data;
    	    console.log("Scraped data: ",scraperData); 
        	
  	  		if(scraperData.length > 1) {
  	  		  dialogHtml += '<p><strong>Content Objects for the keywords "' + query + '" have been successfully created.</strong></p>';
  	  		  dialogHtml += '<p>Generated files:</p><ul>';
  	  		  for(index in scraperData) {
              var co = scraperData[index];
              if(co.urls) {
                for(var i=0; i < co.urls.length; i++) {
                  dialogHtml += '<li><a href="' + co.urls[i] + '" target="_blank">' + co.urls[i] + '</a></li>';
                }
              }
            }
  	  		  dialogHtml += '</ul>';
  	  		  
  	  		} else {
  	  			dialogHtml += '<p><strong>' + scraperData[0].message + '</strong></p>';
  	  			if(scraperData[0].urls) {
  	  				dialogHtml += '<p>Generated files:</p><ul>';
  	  				for(var i=0; i < scraperData[0].urls.length; i++) {
  	  					dialogHtml += '<li><a href="' + scraperData[0].urls[i] + '">' + scraperData[0].urls[i] + '</a></li>';
  	  				}
  	  				dialogHtml += '</ul>';
  	  			}
  	  		}
  	  		$("#dialog").html(dialogHtml);
  	  		$("#dialog").dialog('open');
        	
        } else {
        	
        	//Store the returned data
    	    scraperData = data;
    	    console.log("Scraped data: ",scraperData); 
        	
        	console.log('Data for keywords "' + query + '" successfully fetched.');
        	
        	if(scraperData.length > 0) {
        		$('#save').removeAttr('disabled');
        	}
        	if(scraperData.length > 1) {
        		$('#next').removeAttr('disabled');
        	}
        	
        	manualIndex = 0;
        	setScraperData(manualIndex);
        	
        	$('.search-part').attr('data-last',query);
        	
        	//$("#dialog").html("<p><strong>All results fetched!</strong><br/>Please verify them with the tabs provided and click the 'Save' button on the top if satisfied.</p>");
        	//$("#dialog").dialog("open");
        }
        
        $("#loading").hide();
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
    	  var errorData = {};
    	  
    	  try {
    		  errorData = JSON.parse(jqXHR.responseText);
    	  } catch (e) {}
    	  
    	  alert("An error occured: " + errorData.message || errorThrown + "\n\rPlease indicate if this error is relevant to your expected result. If yes, please try again or contact the administrator of this service.");
    	  $("#loading").hide();
      }
    });
    
  }