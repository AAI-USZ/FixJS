function(page_model, parent_element) {
        dm4c.render.field_label(page_model, parent_element)
        parent_element.append(js.render_text(page_model.value))
    }