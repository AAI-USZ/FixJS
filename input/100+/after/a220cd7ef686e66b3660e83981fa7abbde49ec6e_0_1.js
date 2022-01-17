function(socket) {

		function postMessage(message) {
			socket.emit('message', message);
		}

		function update() {
			postMessage({
				model: F5.Global.flow.toJSON(F5.Global.flow.root)
			});											
		}

		this.update = update;
		this.refresh = update;

		socket.on('message', function (message) {						
//			console.log(message)

			var response = {type: 'response', id: message.id};
			var action;

			try {
				switch (message.type) {
				case 'exec':
					/*jslint evil:true*/
					response.value = eval(message.value);
					break;
				case 'update':
					update();
					break;
				case 'flowDelegate':
					action = function (cb) {
						var node = F5.Global.flow.getNodeFromPath(message.path);								
						var args = message.args || [];
						args.push(cb);								
						node.flowDelegate[message.method].apply(node.flowDelegate, args);									
					};
					break;
				case 'viewDelegate':
					action = function (cb) {
						var node = F5.Global.flow.getNodeFromPath(message.path);
						var args = message.args || [];
						args.push(cb);								
						args.push(cb);
						node.view.delegate[message.method].apply(node.view.delegate, args);									
					};
					break;
				case 'transition':
					action = function (cb) {
						var node = F5.Global.flow.getNodeFromPath(message.path);
						F5.Global.flowController.doTransition(node, message.to, message.parameters, cb);
					};
					break;
				case 'selection':
					response.message = 'did selection';
					break;
				case 'reset':
					response.message = 'reloading. . .';
					if (typeof location !== 'undefined') {
						postMessage(response);
						setTimeout(function () {
							localStorage.clear();
							location.reload();										
						}, 0);
					}
					break;
				case 'frames':
					if (typeof document !== 'defined') {
						if (F5.hasClass(document.body, 'f5frames')) {
							F5.removeClass(document.body, 'f5frames');
						} else {
							F5.addClass(document.body, 'f5frames');										
						}
					}
					break;
				case 'back': 
					F5.Global.flowController.doBack();
					break;
				case 'data': 
					var node = F5.Global.flow.getNodeFromPath(message.path);
					response.message = JSON.stringify(node.data.dump());
					break;
				default:
					response.value = 'unknown message type: ' + message.type;
				}
			} catch (e1) {
				response.type = 'uncaughtException';
				response.value = e1.message;
				console.log(e1);
			}
			
			if (action) {
				try {
					action(function (result) {
						response.value = result;
						postMessage(response);								
					});								
				} catch (e2) {
					response.type = 'uncaughtException';
					response.value = e2.message;
					console.log(e2);	
					postMessage(response);								
				}
			} else {
				postMessage(response);
			}						
		});
	}