function() {
            var idArr = [];
            var titleArr = [];
            $.each($('.mymemberships_select_group_checkbox:checked'), function(i, group) {
                idArr.push($(group).data('groupid'));
                titleArr.push($(group).data('grouptitle'));
            });
            $('#mymemberships_message_button').attr('sakai-entityid', idArr);
            $('#mymemberships_message_button').attr('sakai-entityname', titleArr);
            $('#mymemberships_addpeople_button').data('entityid', idArr);
            $('#mymemberships_addpeople_button').data('entityname', titleArr);
        }