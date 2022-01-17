function(){

var api;
var root;


var listeners = [];
global.listenForMinnow = function(listener){
	if(api === undefined){
		listeners.push(listener);
	}else{
		listener(api);
	}
}

exports.listen = global.listenForMinnow

var schema;

var snapsRemaining = [].concat(snapshotIds);

for(var i=0;i<snapshotIds.length;++i){
	var id = snapshotIds[i];
	console.log('snap id: ' + id);
}

var snaps = [];
global.gotSnapshot = function(snap){
	var index;
	for(var i=0;i<snapsRemaining.length;++i){
		if(snapsRemaining[i] === snap.id){
			index = i;
			break;
		}
	}
	if(index === undefined) throw "error, invalid snap id or already received: " + snap.id;
	
	snapsRemaining.splice(i, 1);
	
	snaps.push(snap);
	
	console.log('received snap: ' + snap.id);
	
	tryLoad();
}

global.gotSchema = function(s){

	schema = s;

	tryLoad();
}

function tryLoad(){
	if(snapsRemaining.length === 0 && schema !== undefined){
		loadMinnowView();
	}
}

function mergeSnapshots(snaps){

	var result = {version: snaps[snaps.length-1].endVersion, objects: []};
	
	var taken = {};
	for(var i=snaps.length-1;i>=0;--i){
		var m = snaps[i].objects;
		
		var objs = m
		
		var t = taken
		
		var resObjs = result.objects
		
		for(var j=0;j<objs.length;++j){
			var obj = objs[j];
			var id = obj.object.meta.id
			
			if(!t[id]){
				t[id] = true;
				resObjs.push(obj)
			}
		}
	}
	
	return result;
}

var snapshot;

global.getRoot = function(){
	_.errout('too soon to getRoot - minnow is not finished loading.  Use listenForMinnow(function(root){...}) to get it as soon as it is loaded.');
}

function loadMinnowView(){
	console.log('got all snapshot parts, loading minnow');
	/*
	var sendFacade = {
		editBuffer: [],
		persistEdit: function(typeCode, id, path, edit){
			sendFacade.editBuffer.push([typeCode, id, path, edit]);
		}
	};*/
	
	snapshot = mergeSnapshots(snaps);
	
	console.log('version loaded: ' + snapshot.version);

	var host = window.location.protocol + '//' + window.location.host// + ':' + minnowSocketPort
	var viewName = schema._byCode[baseTypeCode].name

	update.establishSocket(applicationName, schema, host, function(syncHandle){
		syncHandle._openViewWithSnapshots(baseTypeCode, snapshot.version, snaps, viewName, mainViewParams, function(root){

			getRoot = function(){return root;}
			
			console.log('got main view api')
			api = root
		
			//domready.domready(function(){
			//	console.log('dom ready')
				listeners.forEach(function(listener){
					listener(root);
				});
			//});

		})
	})
}


}