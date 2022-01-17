f	//console.log(this.uid + ' adding snapshot: ' + JSON.stringify(snap))
	var objs = snap.objects;
	//_.assertArray(objs)
	//for(var i=0;i<objs.length;++i){
	var local = this
	_.each(objs, function(obj, idStr){
		//var obj = objs[i];
		//var id = obj.object.meta.id
		/*var cur = this.snap.objects[id]
		if(cur && cur.meta.editId > obj.object.meta.editId){
			continue
		}else{
			if(cur) console.log(cur.meta.editId + ' ' + obj.object.meta.editId)
		}
		this.snap.objects[id] = obj.object*/
		
		var cur = local.snap.objects[idStr]
		if(cur){
			if(cur.length >= obj.length){
				//throw new Error('already got: ' + idStr)
				return
			}
			local.snap.objects[idStr] = cur.concat(obj.slice(cur.length))
		}else{
			local.snap.objects[idStr] = obj
		}
	})
	//console.log(JSON.stringify(this.snap))
}
