function() {
                                if ($.trim($(this).html()) === group_name) {
                                    already_exists = true;
                                    $(this).parent().attr('data-uuid', data);
                                    $(this).parent().find('td.package_action_status').html('<img style="padding-right:8px;" src="images/embed/icons/spinner.gif">' + i18n.adding_group);
                                }
                            }