function() {
    setup();
    load();
    $("#container").append(
        $("<div/>", {
            style: "width:100%;text-align:center;"
        }).append(
            $("<a/>", {
                html: "MOAR",
                "class": "more button",
            })
        ).click(function() {
            button = $(this);
            button.fadeOut("fast", function() {
                load(function() {button.fadeIn("slow");});
            });
        }));
}