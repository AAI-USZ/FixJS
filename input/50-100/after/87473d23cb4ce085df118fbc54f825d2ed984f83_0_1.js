function setup_abd_naming() {

        // if it is a custom selection then show the text box

        if ($('#name_abd_presets :selected').val() == "Custom...") {

            $('#naming_abd_custom').show();

        } else {

            $('#naming_abd_custom').hide();

            $('#naming_abd_pattern').val($('#name_abd_presets :selected').attr('id'));

        }

        fill_abd_examples();

    }