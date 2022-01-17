function(data, textStatus, jqXHR) {
						if (!data.response && !data.error) {
							_this.replaceErrorMessage("Did not receive any session, neither lose session ....");
							return;
						}	
						if (data.error) {
							var message = "Session Error: " + (data.error.message ? data.error.message : " no more session available. Please login again.");
							_this.replaceErrorMessage(message);
							return;
						}	
						if (data.response.noResults) {
							_this.replaceErrorMessage("Wrong password!");
							return;
						}
						var session= data.response;
						_this.session = session.id;
						var value = $('#login_btn').val(100);
						_this.checkCookie(session, value);
						
						if(TissueStack.phone){
							$('#phone_login').append("").fadeOut(500);		
							$('#phone_addDataSet').show().fadeIn(500);  
						}
					}