function (model, url, templateUrl) {
        var template = model.createFromSelection === "fromTemplate" ? model.templateSelection : "";
        window.location = fluid.stringTemplate(url, {
            recordType: model.currentSelection,
            template: template ? fluid.stringTemplate(templateUrl, {template: template}) : ""
        });
    }