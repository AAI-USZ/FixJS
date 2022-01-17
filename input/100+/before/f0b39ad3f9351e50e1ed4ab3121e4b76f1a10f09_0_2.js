function onPhotoSuccess(mediaFiles) {
		var type = "photo";
		var time = getTimestamp();
		console.log(time);
		var i, path, len;
		var db = window.openDatabase("test", "1.0", "Test DB", 1000000);
   		
   		for(i = 0, len = mediaFiles.length; i < len; i += 1) {
    		path = mediaFiles[i].fullPath;
    		sql = insertElement(path, type, time, 0, null, 0);
    		
    		$('#links').append('<a data-role="button" data-theme="a" data-mini="true" onclick="showViewUI(\''+path+'\')">Photo</a>').trigger('create');
    		
    		db.transaction(function(tx){
    					tx.executeSql(sql);
    		 				}, errorCB, successCB);
    	}
	}