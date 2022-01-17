function(json) {
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
            }