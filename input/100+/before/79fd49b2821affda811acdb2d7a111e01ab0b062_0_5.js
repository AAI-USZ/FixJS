function (ev, data) {
	// get value from cookies 
	temp = jQuery.cookie("connection");
	var cookie_conn = JSON.parse(temp);
	
	if (cookie_conn != null){		
		var conn = new Strophe.Connection("http://bosh.metajack.im:5280/xmpp-httpbind");	
			
		conn.xmlInput = function (body) {
		    Client.show_traffic(body, 'incoming');
		};
		conn.xmlOutput = function (body) {
		    Client.show_traffic(body, 'outgoing');
		};
		    
		conn.connect(data.jid, data.password, function (status) {
			if (status === Strophe.Status.CONNECTED) {
				if (data.id != undefined){
					// make db entry if not exists yet
					var dataString = 'id=' + data.id + '&jid=' + data.jid + '&pass=' + data.password;
					jQuery.ajax({
						type: "POST",
						url: "ATutor/mods/chat_new/check_auth.php",
						data: dataString,
						cache: false,
						success: function (returned) {
							if (returned == 0){
								console.log('Error: Cannot insert.');
								
							} else {
								document.getElementById('welcome').style.display = 'none';
								jQuery('#chat').show();
								
								// add div to side box menu
								var data = returned.split(' ');
								var jid = data[0];
								var name = data[1] + ' ' + data[2];
								var pic = data[3];
								Client.show_new_contact(jid, name, pic);
								
								// send subscription request to all course members
								
							}
				        },
				        error: function (xhr, errorType, exception) {
				            console.log("error: " + exception);
				        }		
					});
				}
				
				// store connection into cookies for later use
				var json_text = JSON.stringify(conn);
				jQuery.cookie("connection", json_text, {expires:365});		
				
				jQuery(document).trigger('connected');
			} 
			else if (status === Strophe.Status.AUTHFAIL) {
				jQuery(document).trigger('authfail');
			} 
			else if (status === Strophe.Status.DISCONNECTED) {
				jQuery(document).trigger('disconnected');
			}
		});
		Client.connection = conn;
		console.log(Strophe.Connection.prototype.isPrototypeOf(conn));
	} else {
		Client.connection = cookie_conn;
		console.log(Strophe.Connection.prototype.isPrototypeOf(conn));
		
		jQuery(document).trigger('connected');
	}
}