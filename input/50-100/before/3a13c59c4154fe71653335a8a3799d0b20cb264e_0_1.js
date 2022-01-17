function () {
    "use strict";

    var title = "Magic Land HD";
    var message = "Do you like Magic Land HD? \nRate it now and get 4000 gold! \n \n \ue32f\ue32f\ue32f\ue32f\ue32f\n ";

    var yesHandler = function() {
        wooga.castle.game.increase('gold', 4000);
        window.location.href = rateAppUrl;
    };

    var noHandler = function() {
        // TODO: make nice
    };
    wooga.yesno(message, yesHandler, noHandler, title);

}