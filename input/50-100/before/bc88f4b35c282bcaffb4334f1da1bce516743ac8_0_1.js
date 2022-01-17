function(event) {
        $(".save-item-list").hide();
        event.preventDefault();
        $(document).bind("click.close-save-list", function(event) {
            $(".save-item-list").hide();
            $(this).unbind("click.close-save-list");
        });
        $(this).next("div").click(function(event) {
            event.stopPropagation();
        }).show(200);
        event.stopPropagation();
    }