function(dialogContainer, options, addClose) {
                var $dialogContainer = $(dialogContainer);

                if (addClose) {
                    $dialogContainer.jqm(options).jqmAddClose(addClose);
                } else {
                    $dialogContainer.jqm(options);
                }
            }