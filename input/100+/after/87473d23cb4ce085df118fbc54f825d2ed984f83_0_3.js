function fill_abd_examples() {

        var pattern = $('#naming_abd_pattern').val();



        $.get(sbRoot + '/config/postProcessing/testNaming', {pattern: pattern, abd: 'True'},

            function (data) {

                if (data) {

                    $('#naming_abd_example').text(data + '.ext');

                    $('#naming_abd_example_div').show();

                } else {

                    $('#naming_abd_example_div').hide();

                }

            });



        $.get(sbRoot + '/config/postProcessing/isNamingValid', {pattern: pattern, abd: 'True'},

            function (data) {

                if (data == "invalid") {

                    $('#naming_abd_pattern').qtip('option', {

                        'content.text': 'This pattern is invalid.',

                        'style.classes': 'ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-red'

                    });

                    $('#naming_abd_pattern').qtip('toggle', true);

                    $('#naming_abd_pattern').css('background-color', '#FFDDDD');

                } else if (data == "seasonfolders") {

                    $('#naming_abd_pattern').qtip('option', {

                        'content.text': 'This pattern would be invalid without the folders, using it will force "Flatten" off for all shows.',

                        'style.classes': 'ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-red'

                    });

                    $('#naming_abd_pattern').qtip('toggle', true);

                    $('#naming_abd_pattern').css('background-color', '#FFFFDD');

                } else {

                    $('#naming_abd_pattern').qtip('option', {

                        'content.text': 'This pattern is valid.',

                        'style.classes': 'ui-tooltip-rounded ui-tooltip-shadow ui-tooltip-green'

                    });

                    $('#naming_abd_pattern').qtip('toggle', false);

                    $('#naming_abd_pattern').css('background-color', '#FFFFFF');

                }

            });



    }