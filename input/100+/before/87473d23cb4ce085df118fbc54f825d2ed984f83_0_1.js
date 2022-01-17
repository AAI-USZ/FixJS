function (data) {

                if (data == "invalid") {

                    $('#naming_pattern').css('background-color', '#FFDDDD');

                    $('#custom_naming_warning_text').css('background-color', '#FFDDDD');

                    $('#custom_naming_warning_text').html('This pattern is invalid.');

                    $('#custom_naming_warning').show();

                } else if (data == "seasonfolders") {

                    $('#naming_pattern').css('background-color', '#FFFFDD');

                    $('#custom_naming_warning_text').css('background-color', '#FFFFDD');

                    $('#custom_naming_warning_text').html('This pattern would be invalid without the folders, using it will force "Flatten" off for all shows.');

                    $('#custom_naming_warning').show();

                } else {

                    $('#naming_pattern').css('background-color', '#FFFFFF');

                    $('#custom_naming_warning_text').css('background-color', '#FFFFFF');

                    $('#custom_naming_warning').hide();

                }

            }