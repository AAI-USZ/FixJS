function(dialogContainer, options, addClose) {
                var $dialogContainer = sakai_util.getJqueryObject(dialogContainer);

                if (addClose) {
                    $dialogContainer.jqm(options).jqmAddClose(addClose);
                } else {
                    $dialogContainer.jqm(options);
                }
            }