function(){
		 	var password = $('#password').val();
		 	if(!password ==""){		
				$.ajax({
					async: false,
					url :"backend/security/new_session/json?password="+ password,
					dataType : "json",
					cache : false,
					timeout : 30000,
					success: function(data, textStatus, jqXHR) {
						if (!data.response && !data.error) {
							alert("Did not receive any session, neither lose session ....");
							return;
						}	
						if (data.error) {
							var message = "Session Error: " + (data.error.message ? data.error.message : " no more session available. Please login again.");
							alert(message);
							return;
						}	
						if (data.response.noResults) {
							alert("Please login with right password!");
							return;
						}
						session= data.response;
						TissueStack.Admin.prototype.session = session.id;
						TissueStack.Admin.prototype.checkCookie(session);
					},
					error: function(jqXHR, textStatus, errorThrown) {
						alert("Error connecting to backend: " + textStatus + " " + errorThrown);
					}
				});
			}
			$('#password').val("");
			$("div#panel").animate({
				height: "0px"
			}, "fast");
		}