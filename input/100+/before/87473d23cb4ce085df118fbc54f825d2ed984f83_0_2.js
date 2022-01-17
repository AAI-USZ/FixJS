function fill_examples() {

        var pattern = $('#naming_pattern').val();

        var multi = $('#naming_multi_ep :selected').val();



        $.get(sbRoot + '/config/postProcessing/testNaming', {pattern: pattern},

            function (data) {

                if (data) {

                    $('#naming_example').text(data + '.ext');

                    $('#naming_example_div').show();

                } else {

                    $('#naming_example_div').hide();

                }

            });



        $.get(sbRoot + '/config/postProcessing/testNaming', {pattern: pattern, multi: multi},

            function (data) {

                if (data) {

                    $('#naming_example_multi').text(data + '.ext');

                    $('#naming_example_multi_div').show();

                } else {

                    $('#naming_example_multi_div').hide();

                }

            });



        $.get(sbRoot + '/config/postProcessing/isNamingValid', {pattern: pattern, multi: multi},

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

            });



    }