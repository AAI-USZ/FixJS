function(index, kitchen){
//	    			var projectType = kitchen.value.projectType;
	    			var projectName = kitchen.value.projectName;
	    	    	var firstName = kitchen.value.firstName;
	    	    	var lastName = kitchen.value.lastName;
	    	    	var email = kitchen.value.email;
	    	    	var phone = kitchen.value.phone;
	    	    	var emailBest = kitchen.value.emailBest;
	    	    	var cost = kitchen.value.cost;
	    	    	var priority = kitchen.value.priority;
	    	    	var startDate = kitchen.value.startDate;
	    	    	var jobNotes = kitchen.value.jobNotes;

	    	    		$("#kitchensList").append(
	    	    				$("<li>").attr("data-role", 
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