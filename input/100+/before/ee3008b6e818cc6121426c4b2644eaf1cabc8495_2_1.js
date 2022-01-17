function()
{			
			var main = this; 

			var courseInstructors 	= []; 
			var courseTAs 			= []; 
			var courseStudents 		= []; 
			var courseName 			= $('#courseName').val();				// Populates the fields needed for the database. 
			var courseDescription	= $('#courseDescription').val();
			var courseStartDate  	= $('#courseStartDate').val();
			var courseEndDate  		= $('#courseEndDate').val();
			var coursePicture  		= $('#courseImage').val();
			var courseURL   		= $('#courseURL').val();
			
			
			$('.roleB').each(function(index) {								// Fill in users to appropriate place. 
			   
			   if ($(this).hasClass('active') == true){
			   		
				    var roleName = $(this).text(); 
				    console.log($(this).text());
				    if (roleName == 'Instructor'){
				    		var data = $(this).attr('userid');
					    	courseInstructors.push(data); 
					    } 
					    else if (roleName == 'TA') 
					    {
					    	var data = $(this).attr('userid');
				    		courseTAs.push(data);
				    	} 
				    	else if (roleName == 'Student')
				    	{
				    	var data = $(this).attr('userid');
					    	courseStudents.push(data);
					    } else {
						    alert('Problem reading People.');
					    }
					    console.log(data);
					}
				
			});
		
			courseInstructors = courseInstructors.toString(); 
			courseTAs = courseTAs.toString(); 
			courseStudents = courseStudents.toString()	; 
							
		course = {
				'courseName': courseName,
				'courseDescription': courseDescription,
				'courseInstructors': courseInstructors,
				'courseTAs': courseTAs,
				'courseStudents': courseStudents,
				'courseStartDate' : courseStartDate,
				'courseEndDate' :  courseEndDate,
				'coursePicture' :  coursePicture,
				'courseURL' :  courseURL
			};
			
			main.allCourses.push(course);
			main.saveCourses();
			saved('Your new course is added.');
			$('html, body').animate({scrollTop:0});			// The page scrolls to the top to see the notification


}