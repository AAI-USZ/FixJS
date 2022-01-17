function(page_models, parent_element, level) {
        var list = $("<ul>")
        for (var i = 0; i < page_models.length; i++) {
            list.append($("<li>").text(page_models[i].value))
        }
        dm4c.render.field_label(page_models[0], parent_element)
        parent_element.append(list)
    }