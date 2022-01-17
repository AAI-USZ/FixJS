function (closeButton, model, hide) {
        closeButton[model.term === model.baseRecord.label || hide ? "hide": "show"]();
    }