function(onAccept, onDecline) {
        var buttons = settings.find('#eula_buttons').show();
        buttons.find('#accept').off().enableTap().click(onAccept);
        buttons.find('#decline').off().enableTap().click(onDecline);
    }