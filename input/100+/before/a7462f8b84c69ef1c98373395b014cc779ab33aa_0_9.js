function(index, roof){
//	    			var projectType = roof.value.projectType;
	    			var projectName = roof.value.projectName;
	    	    	var firstName = roof.value.firstName;
	    	    	var lastName = roof.value.lastName;
	    	    	var email = roof.value.email;
	    	    	var phone = roof.value.phone;
	    	    	var emailBest = roof.value.emailBest;
	    	    	var cost = roof.value.cost;
	    	    	var priority = roof.value.priority;
	    	    	var startDate = roof.value.startDate;
	    	    	var jobNotes = roof.value.jobNotes;

	    	    		$("#roofsList").append(
	    	    				$("<div>").attr("data-role", 
	    	    						"collapsible").attr("data-collapsed", "true")
	    	    						.append($("<h3>").text(projectName))
	    	    						.append($("<p>").text(firstName))
	    	    						.append($("<p>").text(lastName))
	    	    						.append($("<p>").text(email))
	    	    						.append($("<p>").text(phone))
	    	    						.append($("<p>").text(emailBest))
	    	    						.append($("<p>").text(cost))
	    	    						.append($("<p>").text(priority))
	    	    						.append($("<p>").text(startDate))
	    	    						.append($("<p>").text(jobNotes))
	    	    				);
	    		}