function(uri) {
    $('#right-page').empty();
    $('#right-page').load(config.textPath + uri, function() {
        $(".selectBox").selectReading();  
    });
}