function(data) {
    	    
    	    $("#loading").hide();
    	    
    	    $.each(selectedItems, function(key, value) {
    	      if(!value) {
    	        return;
    	      }
    	      switch(key) {
      	      case 'text'  : text.splice(value, 1); updateScraperData(manualIndex, 'text', text); break;
      	      case 'threed': threed.splice(value, 1); updateScraperData(manualIndex, '3d', threed); break;
      	      case 'image' : images.splice(value, 1); updateScraperData(manualIndex, 'image', images); break;
      	      case 'video' : videos.splice(value, 1); updateScraperData(manualIndex, 'video', videos); break;
      	      case 'sound' : sounds.splice(value, 1); updateScraperData(manualIndex, 'sound', sounds); break;
      	    }
    	    });
    	    
    	    selectedItems = {};

    		  var restData = hasScraperData();
    		  var dialogHtml = '';
    		  
    		  data = JSON.parse(data);
    		  if(typeof data === 'object') {
    			  dialogHtml += '<p><strong>' + data.message || 'Error' + '</strong></p>';
    			  if(data.urls) {
    				  dialogHtml += '<p>Generated files:</p><ul>';
    				  for(var i=0; i < data.urls.length; i++) {
    					  dialogHtml += '<li><a href="' + data.urls[i] + '">' + data.urls[i] + '</a></li>';
    				  }
    				  dialogHtml += '</ul>';
    			  }
    		  }
    		  
    		  if(restData < 1 || restData == false) {
    			  
    			  dialogHtml += '<p>You revised and saved every fetched Content Object. Please start a new search.</p>';
    			  $('#script-keywords').val('');
    			  $(".datatab").hide();
    			  $("#save").attr('disabled', 'disabled');
    			  $("#dialog").html(dialogHtml);
    			  
    		  } else {
    			  
    			  $("#dialog").html(dialogHtml);
    			  /*
    			  var next = setNext();  
    			  if(next === false || next === 0) {
    				  $('#next').attr('disabled', 'disabled');
    			  } else {
    				  $('#next').removeAttr('disabled');
    			  }
    			  */
    		  }

    		  $("#dialog").dialog('open');
    	  }