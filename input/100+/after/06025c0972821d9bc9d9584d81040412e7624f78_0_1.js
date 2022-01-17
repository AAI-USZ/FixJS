function getData(options) {
	$(selector).text("Loading");
	loading();
	var data = new api({
	    url : globOptions.url + 'api?'});
	data.get(options, function(data){
	    clearTimeout(timer);
	    $(selector).text("");	    
	    createGraph($(selector).get(0), data);
                
	}); 
    }