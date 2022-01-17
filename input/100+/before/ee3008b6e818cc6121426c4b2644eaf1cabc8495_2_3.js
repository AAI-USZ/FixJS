function()									// Sends the new data into the database
{
		var main = this; 
		
		$.ajax({											// Ajax talking to the saveCourses.php file												
			type: "POST",
			url: "scripts/php/saveCourses.php",
			data: {
				courses: main.allCourses							// All course data is sent
											
			},
			  success: function(data) {						// If connection is successful . 
			    	  console.log(data);
			    	  main.GetData();							// Get up to date info from server the course list
			    	  main.listCourses('all');					// Refresh list to show all courses.
			    	  
			    	  saved('Everything saved! ') 			// Remove save button and send save success message 
			    	  $('html, body').animate({scrollTop:0});		// The page scrolls to the top to see the notification
					$('#courseForm').find('input:text, input:password, input:file, select, textarea').val(''); // Fields are emptied to reuse
					$('#addPeopleBody').html('');
			    }, 
			  error: function() {					// If connection is not successful.  
					console.log("Dscourse Log: the connection to saveCourses.php failed.");  
			  }
		});	
	
}