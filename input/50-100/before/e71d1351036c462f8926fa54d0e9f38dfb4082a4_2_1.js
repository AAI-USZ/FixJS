function () {
        location.hash = "giveup";

        var $html = $(template),
            $guess = $html.find(".gw-guess"),
            $word = $html.find(".gw-word"),
            $btnContainer = $html.find(".gw-btn-container");

        wordinput.answer($guess);
        word.display($word, wordinput.getWord());
        playbutton($btnContainer);

        $container.empty().html($html);

    }