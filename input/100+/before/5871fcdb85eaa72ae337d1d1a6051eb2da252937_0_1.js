function toggleDisabled(disable) {
        if (typeof disable === 'boolean') {
            $(input).data("settings").disabled = disable
        } else {
            $(input).data("settings").disabled = !$(input).data("settings").disabled;
        }
        input_box.prop('disabled', $(input).data("settings").disabled);
        token_list.toggleClass($(input).data("settings").classes.disabled, $(input).data("settings").disabled);
        // if there is any token selected we deselect it
        if(selected_token) {
            deselect_token($(selected_token), POSITION.END);
        }
        hidden_input.prop('disabled', $(input).data("settings").disabled);
    }