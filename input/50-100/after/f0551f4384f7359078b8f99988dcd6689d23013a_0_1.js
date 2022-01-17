function getData(options) {
    var data = new api({
        url:location.origin + location.pathname + 'api?'});
    data.get(options, function(data){
        
        console.log(data.length);
        console.log(data);
	$('#loader').hide();
        createGraph('container', data);
                
    }); 
}