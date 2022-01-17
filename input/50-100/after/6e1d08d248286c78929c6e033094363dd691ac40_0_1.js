function (node) {
            // initial state is three options
            var i, prop, optionItem;
            prop = node.getProperty("options");
            prop.children = [];
            for (i = 0; i < 3; i++) {
                optionItem = {};
                optionItem.text = "Option" + (i+1);
                optionItem.value = "Value";
                prop.children.push(optionItem);
            }
            node.setProperty("options", prop);
        }