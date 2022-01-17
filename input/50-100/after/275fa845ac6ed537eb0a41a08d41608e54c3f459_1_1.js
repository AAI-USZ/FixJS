function(page_model, parent_element) {
        dm4c.render.field_label(page_model, parent_element)
        var text = js.render_text(page_model.value)
        if (page_model.rows > 1) {
            text = $("<p>").append(text)
        }
        parent_element.append(text)
    }