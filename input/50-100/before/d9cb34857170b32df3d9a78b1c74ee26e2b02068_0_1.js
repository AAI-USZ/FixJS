function read_content(myUrl) {
    
    var result = null;
    $.ajax( {   url: myUrl, 
              type: 'get', 
              dataType: 'html',
              async: false,
              success: function(data) { result = data; } 
            }
    );
    FileReady = true;

    // using showdown
    var converter = new Showdown.converter();
    result = result.replace(/\r\n/g,'\n');
    return converter.makeHtml(result);

}