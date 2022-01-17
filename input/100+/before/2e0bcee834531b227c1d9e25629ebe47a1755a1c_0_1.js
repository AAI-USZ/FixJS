function( userId, user ){
			var uname = ( user.name || userId ) ;
			$listEl.append( 
				$( "<li />" ).append( 
						$("<span class=\"color\"></span>" + uname + "</li>" )
				).click(function(){
						if( user.isLocal ){
							_this.activeUserInput = true;
							$( this ).parent().attr('title', 'click to edit');
							$( this ).unbind().html( 
									$('<input />').change(function(){
										users[userId].name = $( this ).val();
										localStorage.name =  $( this ).val();
										// sync the user name across the network
										connection.sendMessage( {} );
										_this.activeUserInput = false;
										_this.syncUserList();
									})
								)
							$( this ).find('input').focus();
						}
					}
				)
			)
		}