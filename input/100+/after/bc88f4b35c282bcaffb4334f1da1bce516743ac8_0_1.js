function(event) {
        $(".save-item-list").hide();
        event.preventDefault();
        $(document).bind("click.close-save-list", function(event) {
            $(".save-item-list").hide();
            $(this).unbind("click.close-save-list");
        });
        var $div = $(this).next("div")
        $div.click(function(event) {
            event.stopPropagation();
        }).css({
            left: $(this).position().left - $div.width()        
        }).fadeIn(100);
        event.stopPropagation();
    }