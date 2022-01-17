function() {
	  var serverURL = "/cofetch/getCat";  
	  
	  $.ajax({
    	  type: "GET",
    	  url: serverURL,
    	  dataType: 'JSON',
    	  success: function(data) {
      		$.each(data.paths, function(key,val) {
      			//console.log(key + ' - ' + val);
      		  $('#script-category')
      		    .append($('<option>', { value : val })
      		    .text(val)); 
      		});
    	  },
    	  error: function(jqXHR, textStatus, errorThrown) {
    		  console.log("fetchCategories error. " + errorThrown);
    	  }
      });
  }