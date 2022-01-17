function imdb3(url,q){
    (function($) {
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            //jsonpCallback: 'myFunction',
            contentType: 'application/json',
            dataType: 'jsonp',
            beforeSend	: function(data){
                $("#movie").fadeOut(500,function(e){
                    $("#movie  > table").empty("");
                })
                $("#load").html("<img src='/static/img/load16.gif' />");
            },
            success: function(json) {
                console.dir(json);
                if(json.length == 1 && json[0] == "Nothing found."){
                    $("#movie").removeClass("hidden");
                    $("#search-info > #result-num").text(0);
                    $("#search-info > #query-string").text(q);
                    $("#movie").fadeIn(160,function(e){
                        $("#movie > table").slideDown("slow")
                        });
                }
                else{
                    createTable(json,q);
                }
            },
            error: function(e) {
                console.log(e.message);
                alert("error")
            },
            complete	: function(requestData, exito){ 
                $("#load").empty();
            }
        });
    })(jQuery);
}