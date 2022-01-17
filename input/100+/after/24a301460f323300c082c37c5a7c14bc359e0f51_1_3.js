function(id)
{
	var main = this; 
	var userInst = new Array();
	var userTA 	 = new Array();
	var userStudent = new Array();
	
	$('#profileCourses').html('');
	
	var i, o; 
	for(i = 0; i < main.data.allUsers.length; i++ )	// If view is not specified Construct the table for each element
			{  
				o = main.data.allUsers[i];
				
				if(o.UserID === id) 
				{
					console.log(o);
					$('#profileName').html(o.firstName + " " + o.lastName + " ");
			  		$('#profileEmail').html("  " + o.username);
			  	  	$('#profileAbout1').html(o.userAbout);
			  	  	$('#profileFacebook').html(o.userFacebook);	
			  	  	$('#profileTwitter').html(o.userTwitter);
			  	  	$('#profilePhone').html(o.userPhone);	
			  	  	$('#profileWebsite').html(o.userWebsite);
			  	  	//$('#userStatus').html(singleUser.status);
			  	  	$('#profilePicture').html("<img src=\"" + o.userPictureURL + "\" width=\"120\">");		
			  	  }						
	}
	
	var j, k, listInst;
	for(j = 0; j < main.data.allCourses.length; j++){
		k = main.data.allCourses[j];
		
		
		listInst = k.courseInstructors.split(",");					// Courses user is an instructor in
		var m;
		for (m = 0; m < listInst.length; m++){
			if(listInst[m] == id){
				$('#profileCourses').append(
					'<tr>'
					+ '	<td> <a class="courseLink" courseid="' + k.courseID +'">' + k.courseName + '</a></td>'
					+ '	<td>Instructor</td>'
					+ '</tr>'
				);
			}
		}
		
		listTAs = k.courseTAs.split(",");					// Courses user is a TA in
		var n;
		for (n = 0; n < listTAs.length; n++){
			if(listTAs[n] == id){
				$('#profileCourses').append(
					'<tr>'
					+ '	<td> <a class="courseLink" courseid="' + k.courseID +'">' + k.courseName + '</a></td>'
					+ '	<td>Teaching Assistant</td>'
					+ '</tr>'
				);
			}
		}


		listStudents = k.courseStudents.split(",");					// Courses user is a Student in
		var n;
		for (n = 0; n < listStudents.length; n++){
			if(listStudents[n] == id){
				$('#profileCourses').append(
					'<tr>'
					+ '	<td> <a class="courseLink" courseid="' + k.courseID +'">' + k.courseName + '</a></td>'
					+ '	<td>Student</td>'
					+ '</tr>'
				);
			}
		}		
		
		
	}
				
}