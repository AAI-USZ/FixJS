function() {
            $(window).bind('hashchanged.mymemberships.sakai', handleHashChange);

            $('#mymemberships_search_button').click(function() {
                var q = $.trim($('#mymemberships_livefilter').val());
                if (q !== currentQuery) {
                    $.bbq.pushState({'mq': q, 'mp': 1});
                    currentQuery = q;
                }
            });

            $mymemberships_show_list.click(function() {
                $.bbq.pushState({'ls': 'list'});
            });

            $mymemberships_show_grid.click(function() {
                $.bbq.pushState({'ls': 'grid'});
            });

            $('#mymemberships_livefilter').keyup(function(ev) {
                var q = $.trim($('#mymemberships_livefilter').val());
                if (q !== currentQuery && ev.keyCode === 13) {
                    $.bbq.pushState({'mq': q, 'mp': 1});
                    currentQuery = q;
                }
                return false;
            });

            $('#mymemberships_select_checkbox').change(function() {
                if ($(this).is(':checked')) {
                    $('#mymemberships_addpeople_button').removeAttr('disabled');
                    $('.mymemberships_select_group_checkbox').attr('checked', true);
                } else {
                    $('#mymemberships_addpeople_button').attr('disabled', true);
                    $('.mymemberships_select_group_checkbox').removeAttr('checked');
                }
                checkAddingEnabled();
                updateMessageAndAddToData();
            });

            $('.mymemberships_select_group_checkbox').live('change', function() {
                checkAddingEnabled();
                updateMessageAndAddToData();
            });

            sakai.api.Util.Modal.setup('#mymemberships_delete_membership_dialog', {
                modal: true,
                overlay: 20,
                toTop: true
            });

            $('.s3d-actions-delete', $rootel).live('click', function() {
                if ($(this).hasClass('mymemberhips_disabled_leave')) {
                    sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('GROUP_MEMBERSHIP'),
                        sakai.api.i18n.getValueForKey('UNABLE_TO_LEAVE', 'mymemberships').replace('${groupname}', $(this).attr('data-sakai-entityname')),
                        sakai.api.Util.notification.type.ERROR);
                } else {
                    var msg = sakai.api.i18n.getValueForKey('ARE_YOU_SURE_YOU_WANT_TO_LEAVE', 'mymemberships').replace('${groupname}', '<span class="s3d-bold">' + $(this).data('sakai-entityname') + '</span>');
                    $('#mymemberships_are_you_sure').html(msg);
                    $('#mymemberships_delete_membership_confirm').attr('data-sakai-entityid', $(this).attr('data-sakai-entityid'));
                    $('#mymemberships_delete_membership_confirm').attr('data-sakai-entityname', $(this).attr('data-sakai-entityname'));
                    sakai.api.Util.Modal.open('#mymemberships_delete_membership_dialog');
                }
            });

            $('#mymemberships_delete_membership_confirm').live('click', function() {
                removeMembership($(this).attr('data-sakai-entityid'), $(this).attr('data-sakai-entityname'));
                updateMessageAndAddToData();
            });

            if (sakai_global.profile.main.data.userid !== sakai.data.me.user.userid) {
                    $('.searchgroups_result_plus',$rootel).live('click', function(ev) {
                    var joinable = $(this).data('group-joinable');
                    var groupid = $(this).data('groupid');
                    var itemdiv = $(this);
                    sakai.api.Groups.addJoinRequest(groupid, function (success) {
                        if (success) {
                            var notimsg = '';
                            if (joinable === 'withauth') {
                                // Don't add green tick yet because they need to be approved.
                                notimsg = sakai.api.i18n.getValueForKey('YOUR_REQUEST_HAS_BEEN_SENT');
                            }
                            else  { // Everything else should be regular success
                                $('#searchgroups_memberimage_'+groupid).show();
                                notimsg = sakai.api.i18n.getValueForKey('SUCCESSFULLY_ADDED_TO_GROUP');
                            }
                            sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('GROUP_MEMBERSHIP'),
                                notimsg, sakai.api.Util.notification.type.INFORMATION);
                            itemdiv.removeClass('s3d-action-icon s3d-actions-addtolibrary searchgroups_result_plus');
                            $('#searchgroups_memberimage_' + groupid).show();
                        } else {
                            sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('GROUP_MEMBERSHIP'),
                                sakai.api.i18n.getValueForKey('PROBLEM_ADDING_TO_GROUP'),
                                sakai.api.Util.notification.type.ERROR);
                        }
                    });
                });
            }
        }