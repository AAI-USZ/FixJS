function ($, wordinput, playbutton, template, roundoff) {

    gwRouter.route("giveup", "giveup", function () {
        console.log("#giveup");
    });

    var $container = $("#gw-main");

    return function () {
        location.hash = "giveup";

        var $html = $(template),
            $guess = $html.find(".gw-guess"),
            $btnContainer = $html.find(".gw-btn-container");

        wordinput.answer($guess);
        playbutton($btnContainer);

        $container.empty().html($html);

    };

}