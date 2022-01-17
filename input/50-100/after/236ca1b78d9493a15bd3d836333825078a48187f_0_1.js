function(fileName, contents) {
    	$.ajax({
    	    type: 'POST',
    	    url: "/webeditor/spring/json/", 
    	    data: JSON.stringify(contents),
    	    dataType: "json"
    	});
      return this.storageImpl.setItem(prefix + fileName, JSON.stringify(contents));
    }