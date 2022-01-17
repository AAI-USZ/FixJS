function(fileName, contents) {
    	var jsonfile={json:JSON.stringify(contents)};
    	$.ajax({
    	    type: 'POST',
    	    url: "/webeditor/spring/json/", 
    	    data: jsonfile,
    	    dataType: "json"
    	});
      return this.storageImpl.setItem(prefix + fileName, JSON.stringify(contents));
    }