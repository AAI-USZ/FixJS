function() {
										var paramsArray = { 
											 "id" : $("#userform").attr("name"),
											 "username" : $('#username').val(),
											 "password" : $('#password').val(),
											 "password2" : $('#password2').val(),
											 "firstname" : $('#firstname').val(),
											 "lastname" : $('#lastname').val(), 
											 "email" : $('#email').val(),
											 "year" : $('#year').val(),
											 "pin" : $('#pin').val(),
											 "sudo" : $('#sudo').is(':checked') ? $('#sudo').val() : ''
										};
										
										$.ajax({
											type: "POST",
											url: "../admin/handlers.php",
											data:"func=2&params="+JSON.stringify(paramsArray),
											dataType: 'json',
											success: function(data){
												if(data.status == 'success'){
													$(this).dialog('close');
													location.reload();
												}
												if(data.status == 'update_success'){
													alert(data.msg);
													location.reload();
												}
												if(data.status == 'error'){
													alert(data.msg);
												}
											},
											error: function(data){
												alert("Problem loading form!");
											}
										});	
								}