function saveNewSet(obj){
	try{
	var setElem =  obj.setElem;
	var tuneIds = '';
	
	// figure out what type of obj setElem is and convert to a string of tuneIds
	switch(setElem.constructor){
		case String:
			tuneIds = setElem;
			break;
		case List:
			var ids = setElem.getItemIds();
			setElem.clearList();
			tuneIds = ids.join(",");
			break;
		case Array:
			if(typeof(setElem[0]) == 'string')
				tuneIds = setElem.join(",");
			else{
				try{
					var arr = [];
					for(var i in setElem){
						arr.push(setElem[i].getAttribute('itemId'));
					}
					tuneIds = arr.join(",");
				}catch(e){alert('error in saveNewSet: ' + e.message); return;}	
			}
			break;
		case HTMLSelectElement:
			var arr = [];
			for(var i in setElem.options){
				arr.push(setElem[i].value);
			}
			tuneIds = arr.join(",");
			break;
		default:
			alert("unparseable obj type: "+setElem.constructor)
			return;
	}
	
	
	
	}catch(e){alert(e.message)}


	var testArr = tuneIds.split(',')
	if(!testArr.length){
		alert('empty set')
		return
	}	
	for(var i in testArr){
		if(!isInt(testArr[i])){
			alert('invalid save id')
			return
		}		
	} 
	
	// save the set
	if(obj.groupId){
		doRorLink('/tune_sets/', 'post', {name:'tune_set[tuneIds]', value:tuneIds}, 
							{name:'group_id', value:obj.groupId});
	}else{
		doRorLink('/tune_sets/', 'post', {name:'tune_set[tuneIds]', value:tuneIds});
	}
		
}