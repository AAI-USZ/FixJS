function(messages){

    var errorFiles = [];

    for ( var i = 0; i < messages.length; i++ ) {

      errorFiles.push(messages[i].source);

    }

    

    var result = [];

    $.each(errorFiles, function(i,v){

        if ($.inArray(v, result) == -1) result.push(v);

    });

    return result;

  }