function(){
				var project = $(this).find("project").text();
				var projectType = $(this).find("projectType").text();
				var pName = $(this).find("pName").text();
				var fName = $(this).find("fName").text();
				var lName = $(this).find("lName").text();
				var email = $(this).find("email").text();
				var phone = $(this).find("phone").text();
				var emailOkay = $(this).find("emailOkay").text();
				var cost = $(this).find("cost").text();
				var priority = $(this).find("priority").text();
				var startDate = $(this).find("startDate").text();
				var jobNotes = $(this).find("jobNotes").text();
			$(""+
				"<div>"+  
					"<h2>" + project +"</h2>"+
					"<p>" + projectType +"</p>"+
					"<p>" + pName +"</p>"+
					"<p>" + fName +"</p>"+
					"<p>" + lName +"</p>"+
					"<p>" + email +"</p>"+
					"<p>" + phone +"</p>"+
					"<p>" + emailOkay +"</p>"+
					"<p>" + cost +"</p>"+
					"<p>" + priority +"</p>"+
					"<p>" + startDate +"</p>"+
					"<p>" + jobNotes +"</p>"+
				"</div>"
			).appendTo("#dataHolder");
		}