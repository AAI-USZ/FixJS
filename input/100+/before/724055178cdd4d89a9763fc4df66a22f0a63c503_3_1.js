function(){
            if($(this).attr("checked")) {
                // Make Featured
                $.get('actions/experiments.php', { action:"hideSes", id:$(this).attr('name') }, function(data){
                    if (typeof console == "object") {
                        console.log(data);
                    }
                });
            } else {
                // Remove Feature
                $.get('actions/experiments.php', { action:"unhideSes", id:$(this).attr('name') }, function(data){
                    if (typeof console == "object") {
                        console.log(data);
                    }
                });
            }
        }