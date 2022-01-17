function()	// Gets course information
{	
	var main = this; 
	$.ajax({											// Ajax talking to the getCourses.php file												
			type: "POST",
			url: "scripts/php/getCourses.php",
			  success: function(data) {				// If connection is successful the data will be put into an object. 
			    	  main.allCourses = data;			// The data from php is now available to us as json object allCourses
			    	  main.courseDataStatus = 'loaded';
			    	  main.listCourses('all');				// run the function to show all courses.

			    }, 
			  error: function() {					// If connection is not successful.  
					console.log("Dscourse Log: the connection to getCourses.php failed.");  
			  }
		});	
}