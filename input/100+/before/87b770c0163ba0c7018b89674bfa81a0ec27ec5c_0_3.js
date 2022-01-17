function(msg) {
                var i;
		var notifications;
                var resp;
                var notification;
                var rpc;
                try {
		    resp = JSON.parse(msg.data);
                    if($.isArray(resp)) {
                        notifications = resp;
			for(i = 0; i < notifications.length; ++i) {
                            makeRadarState(notifications[i]);
			}
                    }
                    else if(resp.id) {
		        pending[resp.id](resp);
                    }
                    else {
                        console.log('message is no batch notifications nor response',msg.data);
                    }
                }
                catch(e) {
                    console.log('message is no JSON',msg.data,e);
                }
	    }