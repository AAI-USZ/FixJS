function(data){
                $("#movie").fadeOut(500,function(e){
                    $("#movie  > table").empty("");
                })
                $("#load").html("<img src='/static/img/load16.gif' />");
            }