function(tx){
				me.__tx = tx;
				var q = null, i = 0;
				function success(result, req){
					if (req) {
						q.req = req;// Need to do this in case of cursors
					}
					q.req.readyState = "done";
					q.req.result = result;
					delete q.req.error;
					var e = idbModules.Event("success");
					idbModules.util.callback("onsuccess", q.req, e);
					i++;
					executeRequest();
				};
				
				function error(errorVal){
					q.req.readyState = "done";
					q.req.error = "DOMError";
					var e = idbModules.Event("error", arguments);
					idbModules.util.callback("onerror", q.req, e);
					i++;
					executeRequest();
				};
				try {
					function executeRequest(){
						if (i >= me.__requests.length) {
							me.__active = false; // All requests in the transaction is done
							me.__requests = [];
							return;
						}
						q = me.__requests[i];
						q.op(tx, q["args"], success, error);
					};
					executeRequest();
				} catch (e) {
					// TODO - Call transaction onerror
					logger.error("An exception occured in transaction", arguments);
				}
			}