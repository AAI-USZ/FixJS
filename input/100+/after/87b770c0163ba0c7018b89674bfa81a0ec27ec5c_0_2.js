function() {
	    var pending = {};
	    var id = 0;
            var comTimer;
            var makeRadarState = function(n) {                    
                var parts = n.method.split(':');
                var path = parts[0];
                var event = parts[1];
                var data = n.params[0];
                var desc = {
                    path: path
                };
                if(path.split('.').length < 20) {
                    if(event=='create') {
                        desc.value = data.value;
                        desc.schema = data.schema;
                        Radar[data.type+'sController'].create(desc);
                    }
                    else if(event=='delete') {
                        Radar[data.type+'sController'].destroy(desc);
                    }
                    else if(event=='value') {
                        desc.value = data;
                        Radar.statesController.updateChild(desc);
                    }
                    else if(event=='schema') {
                        desc.schema = data;
                        Radar.statesController.updateChild(desc);
                    }
                }
                else {
                    Ember.Object.create({
                        path: path
                    });
                }
            };
            $('#status-label').css('-webkit-animation','none');
	    ws.onmessage = function(msg) {
                var i;
		var notifications;
                var resp;
                var notification;
                var rpc;                
                if( $('#status-label').css('-webkit-animation') != 'blink 1s infinite') {
                    $('body').css('cursor','progress');
                    $('#status-label').css('-webkit-animation','blink 1s infinite');
                }
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
                if(comTimer) {
                    clearTimeout(comTimer);
                }
                comTimer = setTimeout(function(){
                    $('body').css('cursor','');
                    $('#status-label').css('-webkit-animation','');
                },1000);
	    };
            
	    rpc = function(method,params,on_response) {
                var request = {
		    method: method,
		    params: params                            
                };
                if( $.isArray(params) == false ) {
		    throw "invalid arguments to jet.call";
                }                            
                id += 1;
                request.id = id;
                pending[id] = on_response;
                ws.send(JSON.stringify(request));                    
            };
	    
	    /*.close = function(){
                ping_ws.close();
                ws.close();
	    }*/

            Radar.changeState = function(prop,val,callbacks) {
                callbacks = callbacks || {};
                rpc('set',[prop,val],function(response){
                    if(response.result) {
                        if(callbacks.success) {
                            callbacks.success();
                        }
                    }
                    else if(response.error) {
                        if(callbacks.error) {
                            callbacks.error(response.error);
                        }
                    }
                });
                
            };

            Radar.callMethod = function(method,args,callbacks) {
                callbacks = callbacks || {};
                args.unshift(method);
                rpc('call',args,function(response){
                    if(response.result) {
                        if(callbacks.success) {
                            callbacks.success(response.result);
                        }
                    }
                    else if(response.error) {
                        if(callbacks.error) {
                            callbacks.error(response.error);
                        }
                    }
                });                                    
            };                

	    var fetch = function(path,callbacks) {
                callbacks = callbacks || {};                    
                rpc('fetch',[path],function(response){
                    if(response.result) {
                        if(callbacks.success) {
                            callbacks.success(response.result);
                        }
                    }
                    else if(response.error) {
                        if(callbacks.error) {
                            callbacks.error(response.error);
                        }
                    }
                });                                    
            }();
            Radar.set('status','on');
//            that.fetch();
        }