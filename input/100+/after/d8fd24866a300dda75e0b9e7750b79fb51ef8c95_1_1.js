function(url) {
        var selected_action = $("input[name=perform_action]:checked").attr('id'),
            content_string = content_form.find('#content_input').val(),
            content_array = content_string.split(/ *, */),
            content,
            validation_error;

        if (selected_action == 'perform_action_packages') {
            validation_error = validate_action_requested(content_array, KT.package_action_types.PKG);
            content = {'packages':content_string};
        } else {
            // perform_action_package_groups
            validation_error = validate_action_requested(content_array, KT.package_action_types.PKG_GRP);
            content = {'groups':content_string};
        }

        if (validation_error === undefined) {
            disableContentButtons();
            $.ajax({
                url: url,
                type: 'PUT',
                data: content,
                cache: false,
                success: function(data) {
                    $(data).each( function(index, element) {
                        // The response will have the html to be rendered for the action scheduled, which
                        // includes 1 row for each package or group included in the action.
                        if ($(element).is('tr')) {
                            var name = $(element).find('td').data('name'),
                                existing;

                            // check to see if there was an previous/existing action for the package or group
                            if ($(element).hasClass('package')) {
                                existing = $("tr.package > td[data-name='"+name+"']");
                            } else {
                                existing = $("tr.group > td[data-name='"+name+"']");
                            }

                            if (existing.length > 0) {
                                // there was an action, so just update the status on the existing row
                                existing.next('td.status').replaceWith($(element).find('td.status'));
                            } else {
                                // there was no action, so render the new row
                                if (add_row_shading) {
                                    add_row_shading = false;
                                    $(element).addClass('alt');
                                } else {
                                    add_row_shading = true;
                                }
                                packages_top.prepend(element);
                            }
                        }
                    });
                    enableContentButtons();
                    show_validation_error(false);
                    startUpdater();  // ensure polling is enabled for updates on the action
                },
                error: function() {
                    enableContentButtons();
                }
            });
        } else {
            show_validation_error(true, validation_error);
        }
    }