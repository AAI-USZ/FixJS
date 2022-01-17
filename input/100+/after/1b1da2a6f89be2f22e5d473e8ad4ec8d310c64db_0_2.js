function(popup) {
    Mojo.Log.info("Showing popup " + JSON.stringify(popup));
    var dialog = {
        message: ""
    };
    if ("title" in popup)
        dialog.title = popup.title;
    if ("primary" in response)
        dialog.message += popup.primary;
    if ("secondary" in response)
    {
        if (dialog.message != "")
            dialog.message += "<br/>";
        dialog.message += popup.secondary;
        dialog.allowHTMLMessage = true;
    }

    if ("actions" in popup)
    {
        var choices = [];
        for (var i in popup.actions)
        {
            choices.push({
                label: popup.actions[i],
                value: {
                    id: popup.actions[i].id,
                    request_id: popup.actions[i].request_id
                }
            });
        }

        dialog.choices = choices;
        dialog.preventCancel = true;

        dialog.onChoose = function(value) {
            new Mojo.Service.Request(_ValidatorAddress + "answerEvent", {
                parameters: {
                    answer: value.id,
                    id: value.request_id
                },
                onResponse: function() {
                    this.getEvent();
                }
            });
        };

    }
    else if ("type" in popup)
    {
    }

    this.controller.showAlertDialog(dialog);
}