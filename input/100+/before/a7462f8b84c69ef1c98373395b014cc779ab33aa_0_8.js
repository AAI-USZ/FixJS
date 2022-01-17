function(index, lavatory){
//	    			var projectType = lavatory.value.projectType;
	    			var projectName = lavatory.value.projectName;
	    	    	var firstName = lavatory.value.firstName;
	    	    	var lastName = lavatory.value.lastName;
	    	    	var email = lavatory.value.email;
	    	    	var phone = lavatory.value.phone;
	    	    	var emailBest = lavatory.value.emailBest;
	    	    	var cost = lavatory.value.cost;
	    	    	var priority = lavatory.value.priority;
	    	    	var startDate = lavatory.value.startDate;
	    	    	var jobNotes = lavatory.value.jobNotes;

	    	    		$("#lavatoriesList").append(
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