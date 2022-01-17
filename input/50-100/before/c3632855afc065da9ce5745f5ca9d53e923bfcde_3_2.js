function(onAccept, onDecline) {
        var buttons = settings.find('#eula_buttons').show();
        buttons.find('#accept').unbind().click(onAccept);
        buttons.find('#decline').unbind().click(onDecline);
    }