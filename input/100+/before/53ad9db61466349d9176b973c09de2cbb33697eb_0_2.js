function(Ember,Radar){
    Ember = window.Ember;
    Radar.Container = Ember.ArrayProxy.extend({                    
        factory: null,
        create: function(n){
            var obj = this.factory.create({path:n.path});
            for(var key in n) {
                obj.set(key,n[key]);
            }
            this.pushObject(obj);
        },
        destroy: function(n){
            this.filterProperty('path',n.path).forEach(this.removeObject,this);
        }
    });

    Radar.nodesController = Radar.Container.create({
        content: [],
        factory: Radar.Node
    });

    Radar.statesController = Radar.Container.create({
        content: [],
        factory: Radar.State,
        updateChild: function(n){
            var state = this.findProperty('path',n.path);
            state.set('value',n.value);
        }
    });

    Radar.methodsController = Radar.Container.create({
        content: [],
        factory: Radar.Method
    });

    Radar.treeController = Ember.Object.create({
        directory:'',
        nodesBinding: Ember.Binding.oneWay('Radar.nodesController.content'),
        statesBinding: Ember.Binding.oneWay('Radar.statesController.content'),
        methodsBinding: Ember.Binding.oneWay('Radar.methodsController.content'),
        breadcrumbs: function(){
            var that = this;
            var i;
            var bcs = [];
            bcs.push(Ember.Object.create({
                name: 'root',
                path: '',
                childNodes: this.get('nodes').filterProperty('parent',''),
                childMethods: this.get('methods').filterProperty('parent',''),
                childStates: this.get('states').filterProperty('parent','')
            }));
            if(this.directory.length>0) { 
                var dirs = this.directory.split('.');
                var fullPath = '';
                for(i = 0; i < dirs.length; ++i) {
                    fullPath += dirs[i];
                    bcs.push(Ember.Object.create({
                        path: fullPath,
                        name: dirs[i],
                        childNodes: this.get('nodes').filterProperty('parent',fullPath),
                        childMethods: this.get('methods').filterProperty('parent',fullPath),
                        childStates: this.get('states').filterProperty('parent',fullPath)
                    }));
                    fullPath += '.';
                }
            }                        
            return bcs;
        }.property('directory','nodes.@each','methods.@each','states.@each')
    });

    Radar.selectedController = Ember.Object.create({
        statesBinding: Ember.Binding.oneWay('Radar.statesController.content'),
        methodsBinding: Ember.Binding.oneWay('Radar.methodsController.content'),
        selectedStates: function() {
            var s = this.get('states').filterProperty('selected',true);
            return s;
        }.property('states.@each.selected'),
        selectedMethods: function() {
            var s = this.get('methods').filterProperty('selected',true);
            return s;
        }.property('methods.@each.selected')
    });
    
    var getSelectedFromURL = function() {
        var urlParts = document.URL.split('?');
        var selectedExpr = /selected=(.*)/g;
        try {
            var selectedString = selectedExpr.exec(decodeURIComponent(urlParts[1]))[1];
            return JSON.parse(selectedString);
        }
        catch(e) {
            window.history.pushState('','',urlParts[0]);
            return [];
        }
    };


    Radar.urlController = Ember.Object.create({
        selectedStatesBinding: Ember.Binding.oneWay('Radar.selectedController.selectedStates'),
        selectedMethodsBinding: Ember.Binding.oneWay('Radar.selectedController.selectedMethods'),
        selectedFromURL: getSelectedFromURL(),
        urlUpdated: function() {
            var selectedStates = this.get('selectedStates').getEach('path');
            var selectedMethods = this.get('selectedMethods').getEach('path');
            var selected = selectedStates.concat(selectedMethods);
            var url = document.URL.split('?')[0] + '?selected=' + encodeURIComponent(JSON.stringify(selected));
            window.history.pushState('','',url);
        }.observes('selectedStates.@each','selectedMethods.@each')
    });

    Radar.searchController = Ember.Object.create({
        statesBinding: Ember.Binding.oneWay('Radar.statesController.content'),
        methodsBinding: Ember.Binding.oneWay('Radar.methodsController.content'),
        searchExpression:'',
        allMatches: function() {
            var pathMatches = function(item,index,self) {
                var expr = this.get('searchExpression');
                if( expr !== '' ) {
                    if( item.get('path').indexOf(expr) != -1 ) {
                        return true;
                    }
                }
            };
            var s = this.get('states').filter(pathMatches,this);
            var m = this.get('methods').filter(pathMatches,this);
            return s.concat(m);
        }.property('searchExpression','states.@each','methods.@each'),
        first20Matches: function() {
            return this.get('allMatches').slice(0,20);
        }.property('allMatches')
    });

    var debug = false;
    if (debug) {
        Radar.State.reopen({
            change: function(newVal) {
                this.set('value',newVal);
            }
        });
        Radar.Method.reopen({
            count: 0,
            call: function(args,callbacks) {
                this.set('count',this.get('count')+1);
                if (this.get('count')%3 == 0) {
                    if(callbacks.error) {
                        callbacks.error({message:"oh ohoh",id:1234});
                    }
                }
                else {
                    if(callbacks.success) {
                        callbacks.success({bla:123});
                    }
                }
            },
        });
        Radar.set('status','debug');
        Radar.nodesController.create({
            path: 'test'
        });
        Radar.statesController.create({
            path: 'test.horst',
            value: 1234,
            schema: {
                read_only: true
            }
        });
        Radar.statesController.create({
            path: 'test.peter',
            value: 'hallo',
            schema: 'asdds'
        });
        Radar.statesController.create({
            path: 'test.horst',
            value: {sub:111,pi:3.1415},
            schema: 'asdds'
        });
        Radar.methodsController.create({
            path: 'test.funcy'
        });
        Radar.methodsController.create({
            path: 'test.popoapoapoa'
        });
    }
    else {
        var new_websocket = function(url,protocol) {
	    if( navigator.userAgent.search("Firefox") != -1 ) {
                try {
		    return new WebSocket(url,protocol);
                }
                catch(e) {
                    return new MozWebSocket(url,protocol);
                }
	    }
	    else {
		return new WebSocket(url,protocol);
	    }
	}
        ping_ws = new_websocket('ws://' + window.document.domain + ':8004','ping');
        /*            ping_ws.onopen = function(){
                var ping = function(){                    
                    var t;
                    t = setTimeout(function(){
                        t = null;
                        event.trigger({event:'close'});
                    },3000);
                    ping_ws.onmessage = function(){
                        clearTimeout(t);
                        setTimeout(ping,3000);
                    }
                    ping_ws.send('ping');
                };
                ping();
            };*/
        var ws = new_websocket('ws://' + window.document.domain + ':8004','jet');
        ws.onopen = function() {
	    var pending = {};
	    var id = 0;
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

	    ws.onmessage = function(msg) {
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
        };
    }
    
    return Radar;
}