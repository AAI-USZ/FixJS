function() {
        $.ajax({
            url: "/api/playing",
        }).done(this.displayCurrentTrack);
    }