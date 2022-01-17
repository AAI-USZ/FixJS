function(field_model, parent_element) {
        var checkbox = dm4c.render.checkbox(field_model)    // a jQuery object
        parent_element.append(checkbox)
        //
        return function() {
            return checkbox.get(0).checked
        }
    }