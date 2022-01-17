function(){
						if( user.isLocal ){
							$( this ).parent().attr('title', 'click to edit');
							$( this ).unbind().html( 
									$('<input />').change(function(){
										users[userId].name = $( this ).val();
										localStorage.name =  $( this ).val();
										// sync the user name across the network
										connection.sendMessage( {} );
										_this.syncUserList();
									})
									.focus()
								)
							}
					}