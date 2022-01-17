function(index, basement){
//	    			var projectType = basement.value.projectType;
	    			var projectName = basement.value.projectName;
	    	    	var firstName = basement.value.firstName;
	    	    	var lastName = basement.value.lastName;
	    	    	var email = basement.value.email;
	    	    	var phone = basement.value.phone;
	    	    	var emailBest = basement.value.emailBest;
	    	    	var cost = basement.value.cost;
	    	    	var priority = basement.value.priority;
	    	    	var startDate = basement.value.startDate;
	    	    	var jobNotes = basement.value.jobNotes;
// 
	    	    		$("#basementsList").append(
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