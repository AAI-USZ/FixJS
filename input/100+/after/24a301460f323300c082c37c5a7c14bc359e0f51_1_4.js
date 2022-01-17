function(view)
{	
		var main = this; 

		$('#tablebody').html(" ");					// Empty the table body
		var i, j, k, o, inst, fullName, tas, stu, stuNum; 
		
		if (main.data.allCourses){
			for(i = 0; i < main.data.allCourses.length; i++ )	// If view is not specified Construct the table for each element
			{    	
				o = main.data.allCourses[i];
		    	if (o.courseStatus == view) {
		    			inst = o.courseInstructors.split(",");
			    	  	fullName = "<strong>";
			    		for(j = 0; j < inst.length; j++){
			    			if (inst[j]){
				    			 fullName +=   main.getName(inst[j]) + "<br />";
				    		}
			    		}
			    		
			    		fullName += "</strong>";
		    		
		    		
			    		tas = o.courseTAs.split(",");
			    	  	var TAName = "<em>";
			    		for(var k = 0; k < inst.length; k++){
			    			if (tas[i]){
				    			 TAName +=   main.getName(tas[i]) + "<br />";
				    		}
			    		}
			    		TAName += "</em>";
			    		
			    
			    	stu = o.courseStudents.split(",");
			    	if (stu != ""){
				    	stuNum = stu.length;
			    	} else {
				    	stuNum = 0;
			    	}
			    	  			    		
			    		
		    			    			
		    	  	$('#tablebody').append(
		    	  		  "<tr>"
		    	  		+ "<td> <a class='courseLink' courseid='" + o.courseID + "'> " + o.courseName			+ "</a></td>" 
			            + "<td> " + truncateText(o.courseDescription)	+ "</td>" 
			            + "<td> " + o.courseStatus		+ "</td>" 
			            + "<td><strong> " + fullName	+ "</strong><br/>" + TAName +" </td>" 
			            + "<td> " + stuNum + "</td>"
				        + "<td> <button id='" + o.courseID		+ "' class='btn btn-info editCourse'>Edit</button></td>"
			            + "</tr>" 
		    	  	);
	    	  

	    		} else if (view == 'all'){			// This is bad code, it repeats the entire top section. Need to find a better way. 
		    			inst = o.courseInstructors.split(",");
			    	  	fullName = "<strong>";
			    		for(j = 0; j < inst.length; j++){
			    			if (inst[j]){
				    			 fullName +=   main.getName(inst[j]) + "<br />";
				    		}
			    		}
			    		
			    		fullName += "</strong>";
		    		
		    		
			    		tas = o.courseTAs.split(",");
			    	  	var TAName = "<em>";
			    		for(var k = 0; k < inst.length; k++){
			    			if (tas[i]){
				    			 TAName +=   main.getName(tas[i]) + "<br />";
				    		}
			    		}
			    		TAName += "</em>";
			    		
			    
			    	stu = o.courseStudents.split(",");
			    	if (stu != ""){
				    	stuNum = stu.length;
			    	} else {
				    	stuNum = 0;
			    	}
			    	  			    		
			    		
		    			    			
		    	  	$('#tablebody').append(
		    	  		  "<tr>"
		    	  		+ "<td> <a class='courseLink' courseid='" + o.courseID + "'> " + o.courseName			+ "</a></td>" 
			            + "<td> " + truncateText(o.courseDescription)	+ "</td>" 
			            + "<td> " + o.courseStatus		+ "</td>" 
			            + "<td><strong> " + fullName	+ "</strong><br/>" + TAName +" </td>" 
			            + "<td> " + stuNum + "</td>"
				        + "<td> <button id='" + o.courseID		+ "' class='btn btn-info editCourse'>Edit</button></td>"
			            + "</tr>" 
		    	  	);
		    	  		
		    	  		courseListCourse = { ID: o.courseID, Name : o.courseName}; 
			    	  	main.courseList.push(courseListCourse);
	    		
	    		}

		    	
	     }
		
		}	
}