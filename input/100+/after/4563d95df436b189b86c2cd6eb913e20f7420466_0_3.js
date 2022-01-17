function (event, ui) {
        $(".validateTips").text("").removeClass("ui-state-highlight");
        $(".ui-state-error").removeClass("ui-state-error");

        // $("#segment-actor").val("");
        $("#segment-duration").val("");
        $("#segment-description").val("");

        $("#segment-pos-to-x").val("");
        $("#segment-pos-to-y").val("");
        $("#segment-pos-to-z").val("");

        $("#segment-rot-to-a").val("");
        $("#segment-rot-to-b").val("");
        $("#segment-rot-to-g").val("");

        $("#segment-scale-to-x").val("");
        $("#segment-scale-to-y").val("");
        $("#segment-scale-to-z").val("");
    }