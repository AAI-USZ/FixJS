function() {
                    var pkg = $(this).closest('.package');
                    pkg.attr('data-uuid', data);
                    pkg.find('.package_action_status').html('<img style="padding-right:8px;" src="images/embed/icons/spinner.gif">' + i18n.removing_package);
                }