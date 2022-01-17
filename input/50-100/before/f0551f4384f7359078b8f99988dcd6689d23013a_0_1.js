function getData(options) {
    var data = new api({
        url:'http://' + location.hostname + ':' + location.port + '/api?'});
    data.get(options, function(data){
        
        console.log(data.length);
        console.log(data);
	$('#loader').hide();
        createGraph('container', data);
                
    }); 
}