function forwardCb(typeCode, id, path, op, edit, syncId, editId){
				_.assertLength(arguments, 7);
				_.assert(_.isString(id) || _.isInt(id))
				//console.log('*forwarding edit(' + editId + ' sid: ' + syncId + '): ' + JSON.stringify(edit));
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
					console.log('WARNING: ignoring already sent (or skipped, in error) edit(' + editId + '): ' + JSON.stringify(edit));
				}
				if(syncId !== -1) alreadySent = editId;
			}