function() {
            var val = $.trim(form_element.val())
            var value = Number(val)
            if (isNaN(value)) {
                alert("WARNING: \"" + val + "\" is not a number.\n" +
                    "(field \"" + field_model.label + "\")\n\n" +
                    "The old value is restored.")
                return null                     // prevent this field from being updated
            }
            return value
        }