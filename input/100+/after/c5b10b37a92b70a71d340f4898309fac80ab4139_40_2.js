function getViewState(typeCode, params, includeObjectCb, doneCb, listenerCb, onStopListening){
		
		if(listenerCb) _.assertFunction(listenerCb);
		if(onStopListening) _.assertFunction(onStopListening);
	
		var failed = false;
		function doFailure(){
			failed = true;
			doneCb();
		}
		
		var paramsStr = JSON.stringify(params);

		var obj = {meta: {id: typeCode+':'+paramsStr, typeCode: typeCode, editId: -1}};
		
		var viewSchema = schema._byCode[typeCode].viewSchema;
		
		var alreadyDone = false;

		//console.log('getting view state: ' + _.size(viewSchema.rels));
		var manyRels = _.size(viewSchema.rels);
		var em = manyRels
		var cdl = _.latch(manyRels, 20000, function(){			
			if(failed) return;
			alreadyDone = true;
			console.log('done getting view state:'+ typeCode)
			doneCb(obj);
		}, function(c){
			/*console.log('view ' + typeCode + ' with params: ' + paramsStr);
			console.log('have not yet completed ' + c + ' rels out of ' + manyRels);
			console.log('completed: ' + JSON.stringify(Object.keys(obj)));
			console.log('failed to complete construction of view state within 30 seconds');
			console.log(new Error().stack);*/
		});
		var oldCdl = cdl
		cdl = function(){
			--em
			//console.log('completed part of view state: ' + em)
			oldCdl()
		}

		_.assertInt(viewSchema.code);
		var vrv = viewRvs[viewSchema.code];

		var relCodes = vrv[0];

		function includeObject(objTypeCode, id, objToInclude){
			_.assertDefined(objToInclude)
			_.assertInt(objTypeCode);
	
			_.assertDefined(id);
			_.assertObject(objToInclude);
			includeObjectCb(objTypeCode, id, objToInclude);

			_.assertInt(objToInclude.meta.editId)
			if(obj.meta.editId === undefined || obj.meta.editId < objToInclude.meta.editId){
				obj.meta.editId = objToInclude.meta.editId;
			}
		}
		function doneRel(relIndex, values){
			//_.assertLength(arguments, 2);
			//_.assertInt(values);
			_.assertInt(relIndex);
			//the ids/values
			if(failed){
				cdl();
				console.log('doneRel already failed');
				return;
			}
			
			//console.log('rel done: ' + relIndex);

			var relCode = relCodes[relIndex];
			var viewSchema = schema._byCode[typeCode];
			var ps = viewSchema.propertiesByCode[relCode];
			
			if(values === undefined){
				if(ps.type.type === 'set' || ps.type.type === 'list'){
					//we should always be able to construct the empty set/list
					console.log('doneRel failed');
					doFailure();
					cdl();
					_.errout('values is null');			
				}else{
					cdl();
				}
			}else{
				/*if(ps.type.type === 'object'){
					//_.assertArray(values);
					_//.assertLength(values, 2);
					//_.assertInt(values[0]);
				}else{
					_.errout('TODO?');
				}*/
				//console.log('ps: ' + JSON.stringify(ps));
				//console.log('set rel ' + relCode + ' to ' + JSON.stringify(values).substr(0, 100));

				_.assertNot(alreadyDone);
				//obj.push([relCode, values]);
				obj[relCode] = values;
				cdl();
			}
		}
		
		if(listenerCb){
			vrv[1](params, includeObject, doneRel, listenerCb, onStopListening);
		}else{
			vrv[1](params, includeObject, doneRel);
		}
		
	}