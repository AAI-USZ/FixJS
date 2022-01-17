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

            }