function($) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            //jsonpCallback: 'myFunction',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                console.dir(json);
                myFunction(json);
            },
            error: function(e) {
                console.log(e.message);
                alert("error")
            }
        });
    }