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

                    $('#naming_pattern').qtip('option', {

                        'content.text': 'This pattern is invalid.',

                        'style.classes': 'ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-red'

                    });

                    $('#naming_pattern').qtip('toggle', true);

                    $('#naming_pattern').css('background-color', '#FFDDDD');

                } else if (data == "seasonfolders") {

                    $('#naming_pattern').qtip('option', {

                        'content.text': 'This pattern would be invalid without the folders, using it will force "Flatten" off for all shows.',

                        'style.classes': 'ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-red'

                    });

                    $('#naming_pattern').qtip('toggle', true);

                    $('#naming_pattern').css('background-color', '#FFFFDD');

                } else {

                    $('#naming_pattern').qtip('option', {

                        'content.text': 'This pattern is valid.',

                        'style.classes': 'ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-green'

                    });

                    $('#naming_pattern').qtip('toggle', false);

                    $('#naming_pattern').css('background-color', '#FFFFFF');

                }

            });



    }