function complexWrap(){
			var held = [];
			var heldCount = {};
			var latestEditId;
			var waitingEdits = [];
			var alreadySent;

			function holdCb(editId){
				if(latestEditId !== undefined && editId < latestEditId){
					_.errout('got edit ids out of order, ' + latestEditId + ' before ' + editId);
				}
				latestEditId = editId;
				held.push(editId);
				if(heldCount[editId] === undefined) heldCount[editId] = 1;
				else ++heldCount[editId];
			}
			function releaseCb(editId){
				_.assertDefined(latestEditId);
				var hc = heldCount[editId];
				_.assertInt(hc);
				hc = --heldCount[editId];
				if(hc === 0){
					var index = held.indexOf(editId);
					_.assert(index >= 0);
					held.splice(index, 1);
					delete heldCount[editId];
					if(index === 0){
						//the released edit is the oldest one currently being held
						//console.log('releasing edits: ' + waitingEdits.length);
						while(waitingEdits.length > 0 && waitingEdits[0][0] <= editId){
							var e = waitingEdits.shift();
							forwardCbOn.apply(undefined, e[1]);
						}
					}
				}
			}
			function forwardCbOn(typeCode, id, path, op, edit, syncId, editId){
				_.assertLength(arguments, 7);
				_.assertInt(syncId);
				_.assertString(op)
				_.assert(_.isString(id) || _.isInt(id))
				lcb(typeCode, id, path, op, edit, syncId, editId);
			}
			var rrr = Math.random()
			function forwardCb(typeCode, id, path, op, edit, syncId, editId){
				_.assertLength(arguments, 7);
				_.assert(_.isString(id) || _.isInt(id))
				console.log(rrr + ' *forwarding edit(' + editId + ' sid: ' + syncId + '): ' + JSON.stringify(edit));
				if(alreadySent === undefined || alreadySent < editId || 
						(alreadySent === editId && syncId === -1)//edits sourced from views may reuse the same editId
					){
					if(held.length === 0 || held[0] > editId){
						_.assertInt(syncId);
						lcb(typeCode, id, path, op, edit, syncId, editId);
					}else{
						//console.log('holding edit');
						waitingEdits.push([editId, Array.prototype.slice.call(arguments, 0)]);
					}
				}else{
					console.log(rrr + ' WARNING(' + alreadySent + '): ignoring already sent (or skipped, in error) edit(' + editId + '): ' + JSON.stringify(edit));
				}
				if(syncId !== -1) alreadySent = editId;
			}
			
		
			

			
			_.each(relListenerMakerList, function(m, i){
				function redone(result){
					doneCb(i, result);
				}

				_.assertInt(m.code);
				_.assertInt(viewTypeCode);
				function listenerCb(op, edit, editId, more){
				
					//_.assertLength(arguments, 1);
					_.assert(arguments.length >= 3);
					_.assert(arguments.length <= 4);

					_.assertString(op)
					if(edit.op === 'objectSnap'){
						forwardCb(viewTypeCode, viewTypeCode+':'+paramsStr, [], op, edit, -1, editId);
					}else{
						forwardCb(viewTypeCode, viewTypeCode+':'+paramsStr, [m.code], op, edit, -1, editId);
					}
				}
				listenerCb.isCbFunction = true;
				
				var cbs = {
					listener: listenerCb,//this is used for updates to the current view
					hold: holdCb, 
					release: releaseCb, 
					onStop: onStopListening,
					forward:forwardCb//this is used for edits to objects included by the view
				};
				m(params,includeObject, redone, cbs);
			});
		}