function(field_model, parent_element) {
        var input = dm4c.render.input(field_model)
        parent_element.append(input)
        //
        return function() {
            var val = $.trim(input.val())
            var value = Number(val)
            if (isNaN(value)) {
                alert("WARNING: \"" + val + "\" is not a number.\n" +
                    "(field \"" + field_model.label + "\")\n\n" +
                    "The old value is restored.")
                return null     // prevent this field from being updated
            }
            return value
        }
    }