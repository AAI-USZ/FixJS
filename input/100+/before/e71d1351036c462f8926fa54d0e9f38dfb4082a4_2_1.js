function ($, wordinput, Word, playbutton, template, roundoff) {

    gwRouter.route("giveup", "giveup", function () {
        console.log("#giveup");
    });

    var $container = $("#gw-main"),
        word = new Word();

    return function () {
        location.hash = "giveup";

        var $html = $(template),
            $guess = $html.find(".gw-guess"),
            $word = $html.find(".gw-word"),
            $btnContainer = $html.find(".gw-btn-container");

        wordinput.answer($guess);
        word.display($word, wordinput.getWord());
        playbutton($btnContainer);

        $container.empty().html($html);

    };

}