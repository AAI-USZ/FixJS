function(response){
				for (var i=0, j=response.projectData.length; i<j; i++){
					console.log(response);
					var sp = response.projectData[i];
					$(""+
						"<li>"+  
							"<h2>" + sp.projects +"</h2>"+
							"<p>" + sp.project +"</p>"+
							"<p>" + sp.pname +"</p>"+
							"<p>" + sp.fname +"</p>"+
							"<p>" + sp.lname +"</p>"+
							"<p>" + sp.email +"</p>"+
							"<p>" + sp.phone +"</p>"+
							"<p>" + sp.emailOkay +"</p>"+
							"<p>" + sp.cost +"</p>"+
							"<p>" + sp.priority +"</p>"+
							"<p>" + sp.startDate +"</p>"+
							"<p>" + sp.jobNotes +"</p>"+
						"</li>"
					).appendTo("#dataHolder");
				};
				$("#dataHolder").listview("refresh");
			}