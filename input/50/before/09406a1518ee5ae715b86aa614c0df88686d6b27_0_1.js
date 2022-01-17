function() {
        $("#param_form").keydown(function(event) {
            if(event.keyCode == 13){
                makePlaylist();
                return false;
            }
        });
        $("#_artist").select();
    }