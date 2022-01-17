function(data) {
                        monitorStatus(data, KT.package_action_types.PKG_GRP_INSTALL);

                        for (var i = 0; i < content_array.length; i++) {
                            var group_name = $.trim(content_array[i]), already_exists = false;
                            groups_in_progress[group_name] = true;

                            $('tr.content_group').find('td.package_name').each( function() {
                                if ($.trim($(this).html()) === group_name) {
                                    already_exists = true;
                                    $(this).parent().attr('data-pending-action-id', data);
                                    $(this).parent().find('td.package_action_status').html('<img style="padding-right:8px;" src="images/embed/icons/spinner.gif">' + i18n.adding_group);
                                }
                            });
                            // if row already existed... skip...
                            if (already_exists === false) {
                                if (add_row_shading) {
                                    add_row_shading = false;
                                    packages_top.prepend('<tr class="alt content_group" data-pending-action-id='+data+'><td></td><td class="package_name">' + group_name + '</td><td class="package_action_status"><img style="padding-right:8px;" src="images/embed/icons/spinner.gif">' + i18n.adding_group + '</td></tr>');
                                } else {
                                    add_row_shading = true;
                                    packages_top.prepend('<tr class="content_group" data-pending-action-id='+data+'><td></td><td class="package_name">' + group_name + '</td><td class="package_action_status"><img style="padding-right:8px;" src="images/embed/icons/spinner.gif">' + i18n.adding_group + '</td></tr>');
                                }
                            }
                        }
                        enableLinks();
                        show_validation_error(false);
                    }