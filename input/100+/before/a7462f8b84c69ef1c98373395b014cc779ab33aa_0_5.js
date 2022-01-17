function(index, addition){
//	    			var projectType = addition.value.projectType;
	    			var projectName = addition.value.projectName;
	    	    	var firstName = addition.value.firstName;
	    	    	var lastName = addition.value.lastName;
	    	    	var email = addition.value.email;
	    	    	var phone = addition.value.phone;
	    	    	var emailBest = addition.value.emailBest;
	    	    	var cost = addition.value.cost;
	    	    	var priority = addition.value.priority;
	    	    	var startDate = addition.value.startDate;
	    	    	var jobNotes = addition.value.jobNotes;

	    	    		$("#additionsList").append(
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