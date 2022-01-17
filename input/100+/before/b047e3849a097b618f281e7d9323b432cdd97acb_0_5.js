function() {
	  
  	var serverURL = "/cofetch/post/";  
  	
  	if($('#main-name').val().length < 2) {
  		alert("You need at least a valid name for the Content Object in order to save it!");
  		return;
  	}
  	
  	var tags = $('#threed-tags').val().split(",");
  	for(var t=0; t < tags.length; t++) {
  		tags[t] = tags[t].replace(/^\s*|\s*$/g,'');
  		tags[t] = tags[t].charAt(0).toUpperCase() + tags[t].slice(1);
  	}
	
    //Let's serialize our form:   
    var jsonFile = {
      "ID": contentObjectID,
      "Name": $('#main-name').val(),
      "Screenshot": getScreenshot(),
      "CategoryPath": $('#main-categoryPath').val(), 
      "Files": [{
          "Type": "Text",
          "FreeText": $('#text-content').val()
      }]
    };
    
    if($('#threed-name').val().length > 0) {
      
      jsonFile.Files.push(
      {
        "Type": "Object3D",
        "Name": $('#threed-name').val(), 
        "Description:": $('#threed-desc').val(),
        "Tags": tags,
        "Extension": $('#threed-extension').val(),
        "License": $('#threed-license').val(),
        "LicenseURL": $('#threed-licenseURL').val(),
        "Author": $('#threed-author').val(),
        "Date": $('#threed-date').val(),
        "Size": $('#threed-size').val(),
        "URL": $('#threed-url').val(),
        "Preview": $('#threed-preview').val(),
        "Emotions": $('#threed-emotions').val() || [],
        "Location": $('#threed-location').val().split(","),
        "Weather": {
          "condition": $('#threed-weather-condition').val(), 
          "wind": $('#threed-weather-wind').val(), 
          "temperature": $('#threed-weather-temperature').val(), 
          "humidity": $('#threed-weather-humidity').val()
        }
      });
    }
    
    if($('#image-name').val().length > 0) {
    	var tags = $('#image-tags').val().split(",");
    	for(var t=0; t < tags.length; t++) {
    		tags[t] = tags[t].replace(/^\s*|\s*$/g,'');
    		tags[t] = tags[t].charAt(0).toUpperCase() + tags[t].slice(1);
    	}
    	
    	jsonFile.Files.push(
			{
		        "Type": "ImageType",
		        "Name": $('#image-name').val(),
		        "Description": $('#image-desc').val(),
		        "Tags": tags,
		        "Extension": $('#image-extension').val(),
		        "License": $('#image-license').val(),
		        "LicenseURL": $('#image-licenseURL').val(),
		        "Author": $('#image-author').val(),
		        "Date": $('#image-date').val(),
		        "Size": $('#image-size').val(),
		        "URL": $('#image-url').val(),
		        "Preview": $('#image-preview').val(),
		        "Dimensions": $('#image-dimensions').val(),
		        "Emotions": $('#image-emotions').val() || [],
		        "Location": $('#image-location').val().split(","),
		        "Weather": {
		          "condition": $('#image-weather-condition').val(), 
		          "wind": $('#image-weather-wind').val(), 
		          "temperature": $('#image-weather-temperature').val(), 
		          "humidity": $('#image-weather-humidity').val()
		        }
		    }
    	); 
    };
    
    if($('#video-name').val().length > 0) {
    	var tags = $('#video-tags').val().split(",");
    	for(var t=0; t < tags.length; t++) {
    		tags[t] = tags[t].replace(/^\s*|\s*$/g,'');
    		tags[t] = tags[t].charAt(0).toUpperCase() + tags[t].slice(1);
    	}
    	
    	jsonFile.Files.push(
			{
		        "Type": "VideoType",
		        "Name": $('#video-name').val(), 
		        "Description": $('#video-desc').val(),
		        "Tags": tags,
		        "Extension": $('#video-extension').val(),
		        "License": $('#video-license').val(),
		        "LicenseURL": $('#video-licenseURL').val(),
		        "Author": $('#video-author').val(),
		        "Date": $('#video-date').val(),
		        "Size": $('#video-size').val(),
		        "URL": $('#video-url').val(),
		        "Preview": $('#video-preview').val(),
		        "Dimensions": $('#video-dimensions').val(),
		        "Length": $('#video-length').val(),
		        "Emotions": $('#video-emotions').val() || [],
		        "Location": $('#video-location').val().split(","),
		        "Weather": {
		          "condition": $('#video-weather-condition').val(), 
		          "wind": $('#video-weather-wind').val(), 
		          "temperature": $('#video-weather-temperature').val(), 
		          "humidity": $('#video-weather-humidity').val()
		        }
		    }
    	);
    };
    
    if($('#sound-name').val().length > 0) {
    	var tags = $('#sound-tags').val().split(",");
    	for(var t=0; t < tags.length; t++) {
    		tags[t] = tags[t].replace(/^\s*|\s*$/g,'');
    		tags[t] = tags[t].charAt(0).toUpperCase() + tags[t].slice(1);
    	}
    	
    	jsonFile.Files.push(
			{
		        "Type": "SoundType",
		        "Name": $('#sound-name').val(),
		        "Description": $('#sound-desc').val(),
		        "Tags": tags,
		        "Extension": $('#sound-extension').val(),
		        "License": $('#sound-license').val(),
		        "LicenseURL": $('#sound-licenseURL').val(),
		        "Author": $('#sound-author').val(),
		        "Date": $('#sound-date').val(),
		        "Size": $('#sound-size').val(),
		        "URL": $('#sound-url').val(),
		        "Preview": $('#sound-preview').val(),
		        "Length": $('#sound-length').val(),
		        "Emotions": $('#sound-emotions').val() || [],
		        "Location": $('#sound-location').val().split(","),
		        "Weather": {
		          "condition": $('#sound-weather-condition').val(), 
		          "wind": $('#sound-weather-wind').val(), 
		          "temperature": $('#sound-weather-temperature').val(), 
		          "humidity": $('#sound-weather-humidity').val()
		        }
		     }
    	);
    };
    
    //Send it to the server
    $.ajax({
    	  type: "POST",
    	  url: serverURL,
    	  data: JSON.stringify(jsonFile),
    	  success: function(data) {
    		  //Remove the saved CO from the temporary data array
    		  scraperData.splice(manualIndex,1);
    		  manualIndex = -1;
    		  $('#previous').attr('disabled', 'disabled');
    		  resetForm();

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
    			  $(".datatab").show();
    			  $("#dialog").html(dialogHtml);
    			  
    		  } else {
    			  
    			  $("#dialog").html(dialogHtml);
    			  
    			  var next = setNext();  
    			  if(next === false || next === 0) {
    				  $('#next').attr('disabled', 'disabled');
    			  } else {
    				  $('#next').removeAttr('disabled');
    			  }
    			  
    		  }
    		  
    		  $("#dialog").dialog('open');
    	  },
    	  error: function(jqXHR, textStatus, errorThrown) {
    		  var errorData = {};
        	  try {
        		  errorData = JSON.parse(jqXHR.responseText);
        	  } catch (e) {}
        	  
        	  alert("An error occured: " + errorData.message || errorThrown + "\n\rPlease try again or contact the administrator of this service.");  
          },
    	  traditional: true,
    	  dataType: "text",
    	  contentType : "application/json; charset=utf-8"
    });
    
  }