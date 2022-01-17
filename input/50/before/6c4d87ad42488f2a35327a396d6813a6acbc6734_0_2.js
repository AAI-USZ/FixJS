function(field_model, parent_element) {
        var form_element = dm4c.render.checkbox(field_model)    // a jQuery object
        parent_element.append(form_element)
        //
        return function() {
            return form_element.get(0).checked
        }
    }