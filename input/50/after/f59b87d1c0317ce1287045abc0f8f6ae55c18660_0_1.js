function() {
        var contents = editor.getSession().getValue();
        var output = {
            content: contents
        }
        $('.debug').html(JSON.stringify(output)); //change this to POST to a url
    }