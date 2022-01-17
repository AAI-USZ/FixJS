function handleSaveLinkClick(elem, event) {
        event.preventDefault();
        console.log("Got click");
        var $elem = $(elem);
        $.post($elem.attr("href"), function(data) {
            if (data && data.ok) {
                $elem.closest(".save-item-list")
                    .hide(200)
                    .prev("a").find("i").attr("class", "icon-star");
            }
        }, "json");
    }