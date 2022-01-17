function loadShoutbox(){
    var url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";

    if(location.hostname == "localhost"){
        url += "simpleMVC/"
    }

    $.ajax({
        url: url +"modules/shoutbox/views/shout.php"
    }).done(function(data){
            $(".shout").empty();
            $(".shout").append(data);
            $(".shout").mCustomScrollbar();
            $(".shout_remove").find('a').click(function(event){
                event.stopPropagation();

                var url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";
                if(location.hostname == "localhost"){
                    url += "simpleMVC/"
                }

                $.ajax({
                    url: url +"modules/shoutbox/views/remove.php" ,
                    type: "POST",
                    data: {shout_id: $(this).attr("href")}
                }).done(function(data){
                        loadShoutbox();
                    });
                return false;
            });
        });
}