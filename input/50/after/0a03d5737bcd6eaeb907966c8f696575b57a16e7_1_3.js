function (closeButton, model, hide) {
        closeButton[model.term === model.baseRecord.displayName || hide ? "hide": "show"]();
    }