function (response) {

        $("#logFetchStatus").hide();
        $("#instanceLog").fadeIn();
        $("#instanceLog").fadeTo('fast', 1.0);
        $("#instanceLog").html(response.log);
    }