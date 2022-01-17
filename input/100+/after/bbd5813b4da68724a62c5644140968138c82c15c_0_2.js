function loadShoutbox(){
    $.ajax({
        url: url() +"modules/shoutbox/views/shout.php"
    }).done(function(data){
            $(".shout").empty();
            $(".shout").append(data);
            $(".shout").mCustomScrollbar();
            $(".shout_remove").find('a').click(function(event){
                event.preventDefault();
                event.stopPropagation();
                $.ajax({
                    url: url() +"modules/shoutbox/views/remove.php" ,
                    type: "POST",
                    data: {shout_id: $(this).attr("href")}
                }).done(function(data){
                        loadShoutbox();
                    });
                return false;
            });
        });
}