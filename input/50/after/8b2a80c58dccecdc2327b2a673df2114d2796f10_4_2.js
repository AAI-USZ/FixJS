function(uri) {
    $('#text-right').empty();
    $('#text-right').load(config.textPath + uri, function() {
        $(".selectBox").selectReading();  
    });
}