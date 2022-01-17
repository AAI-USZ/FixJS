function(event) {
        $(".house_photo").removeClass("house_photo_selected");
        $(this).addClass("house_photo_selected");
        $("#gallery-dialog").html('<img src="' + $(this).prop("src") + '" style="width: 100%" /><h3>' + $(this).prop("data-date") + ' from ' + $(this).prop("data-attribution") + '</h3>');
        $("#gallery-dialog").dialog("open");
    }