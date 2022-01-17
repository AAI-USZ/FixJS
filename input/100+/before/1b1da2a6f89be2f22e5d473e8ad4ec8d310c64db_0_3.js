function(options) {
    for (var name in options) {
        var node = options[name];
        if (node.type in _TypeToMojoElement)
        {
            var model = {
                itemId: name,
                name: "optionWidget_" + node.type,
                itemText: node.text,
                itemMojoElement: _TypeToMojoElement[node.type],
                disabled: false
            };

            if ("default_value" in node)
                model.value = node.default_value || "";

            if (node.type == "list")
            {
                model.choices = [];
                for (var name_ in node.choices)
                    model.choices.push({
                        label: node.choices[name_],
                        value: name_
                    });
            }

            this.optionsModel.items.push(model);
        }
    }

    // Setup widgets
    this.controller.setupWidget("optionWidget_string", {
        changeOnKeyPress: true
        }, {});

    this.controller.setupWidget("optionWidget_int", {
        changeOnKeyPress: true,
        charsAllow: function(c) {
            if (/[0-9]/.test(c))
                return true;
            else
                return false;
            }
        }, {});

    this.controller.setupWidget("optionWidget_bool", {}, {});
    this.controller.setupWidget("optionWidget_list", {}, {});

    Mojo.Log.info(JSON.stringify(this.optionsModel));
    this.controller.modelChanged(this.optionsModel);
    this.controller.instantiateChildWidgets(this.controller.get("OptionsList"));

    for (var name in options) {
        if (this.controller.get(name))
            this.controller.listen(
                this.controller.get(name),
                Mojo.Event.propertyChange,
                this.prefsChanged.bindAsEventListener(this, name)
        );
    }
}