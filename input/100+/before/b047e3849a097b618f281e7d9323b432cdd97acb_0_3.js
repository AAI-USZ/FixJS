function(type, query, page, gps) {
	  
	  var serverURL = "/cofetch/getPart/";
	  //var serverURL = "http://localhost:8082/get/";
	  
	  console.log('Waiting for results for ' + type + ' search with query "' + query + '"');
	    
	  //Request our data
	  $.ajax({
		  url: serverURL + type + '/' + query.replace(/\s/g,'+') + '/' + page + '/' + gps,
		  dataType: "jsonp",
		  jsonpCallback: "_cofetchcb",
		  timeout: 80000,
		  success: function(data) {
			  console.log(type + 'data for query "' + query + '" successfully fetched.');
                
			  console.log("Scraped data: ",data);
        
			  var files = [];
			  //Check if there was an error
			  if(data.error) {
			    console.log(data.error);
			  } else {
			    files = data.response;
			  }
			  
			  //Now, let's sort the files according to their type
        if (type === "image") {
      	  //Reset the old result
      	  images = [];
      	  
      	  $.each(files, function(index, file){  
      		  images.push(file);
      	  });
      	  
      	  if(images.length > 0) {
      	    $('#search-image-prev,#search-image-next').show();
      		  setImage();
      	  } else {
      	    $('#search-image-prev,#search-image-next').hide();
      	    setMediaList('image',images);
      	  }
      	  
      	  $('#search-image-loader').hide();
      	  
        } else if (type === "text") {
      	  //Reset the old result
      	  text = [];
      	  
      	  $.each(files, function(index, file){  
      		  text.push(file);
      	  });
      	  
      	  if(text.length > 0) {
      		  setText();
      	  } else {
      	    setMediaList('text',text);
      	  }
      	  
      	  $('#search-text-loader').hide();
      	  
        } else if (type === "video") {
      	  //Reset the old result
      	  videos = [];
      	  
      	  $.each(files, function(index, file){  
      		  videos.push(file);
      	  });
      	  
      	  if(videos.length > 0) {
      	    $('#search-video-prev,#search-video-next').show();
      		  setVideo();
      	  } else {
      	    $('#search-video-prev,#search-video-next').hide();
      	    setMediaList('video',videos);
      	  }
      	  
      	  $('#search-video-loader').hide();
      	  
        } else if (type === "sound") {
      	  //Reset the old result
      	  sounds = [];
      	  
      	  $.each(files, function(index, file){  
      		  sounds.push(file);
      	  });
      	  
      	  if(sounds.length > 0) {
      	    $('#search-sound-prev,#search-sound-next').show();
      		  setSound();
      	  } else {
      	    $('#search-sound-prev,#search-sound-next').hide();
      	    setMediaList('sound',sounds);
      	  }
      	  
      	  $('#search-sound-loader').hide();
      	  
        } else if (type === "3d") {
      	  //Reset the old result
      	  threed = [];
      	  
      	  $.each(files, function(index, file){  
      		  threed.push(file);
      	  });
      	  
      	  if(threed.length > 0) {
      	    $('#search-threed-prev,#search-threed-next').show();
      		  set3d();
      	  } else {
      	    $('#search-threed-prev,#search-threed-next').hide();
      	    setMediaList('threed',threed);
      	  } 
      	  
      	  $('#search-threed-loader').hide();
        }
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
    	  var errorData = {};
    	  
    	  try {
    		  errorData = JSON.parse(jqXHR.responseText);
    	  } catch (e) {}
    	  
    	  alert("An error occured: " + errorData.error || errorThrown + "\n\rPlease try again or contact the administrator under jonas.etzold@fh-erfurt.de .");  
      }
    });
  }