function(fileName, contents) {
    	$.ajax({
    	    type: 'POST',
    	    url: "/webeditor/spring/json/", 
    	    data: "lala",
    	    dataType: "text"
    	});
      return this.storageImpl.setItem(prefix + fileName, JSON.stringify(contents));
    }