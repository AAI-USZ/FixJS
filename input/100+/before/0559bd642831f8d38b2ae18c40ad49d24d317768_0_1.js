function dispatch_admin_operation(event) {
    var target = $(event.target);
    if (target.val() == 'none' || target.val() == 'nonedefault') { return false; };
    if ($('#selections').children().size() == 0) {
        show_error_dialog('何も選択されていません', reset_admin_operation_selection);
        return null;
    }
    var modeltype = null;
    var dialogtype = null;
    var goto_url = null;

    if (target.attr('id') == 'host_operation_list') {
        modeltype = 'host';
        
        switch (target.val()) {
        case 'status_under_dev':
        case 'status_in_service':
        case 'status_no_count':
        case 'status_suspended':
        case 'status_standby':
        case 'status_removing':
        case 'status_removed':
        case 'status_missing':
        case 'status_other':
        case 'delete_records':
        case 'tie_hypervisor': dialogtype = 'confirm_dialog'; break;
        case 'change_service':
        case 'add_tag':
        case 'change_dns': dialogtype = 'form_dialog'; break;
        };
    }
    else if (target.attr('id') == 'service_operation_list') {
        modeltype = 'service';
        switch (target.val()) {
        case 'add_host': goto_url = '/ybz/host/create?service=' + $('#selections').children().eq(0).attr('title'); break;
        case 'change_content': dialogtype = 'form_dialog'; break;
        case 'delete_records': dialogtype = 'confirm_dialog'; break;
        };
    }
    else if (target.attr('id') == 'content_operation_list') {
        modeltype = 'content';
        switch (target.val()) {
        case 'change_dept': dialogtype = 'form_dialog'; break;
        case 'delete_records': dialogtype = 'confirm_dialog'; break;
        };
    }
    else if (target.attr('id') == 'dept_operation_list') {
        modeltype = 'dept';
        switch (target.val()) {
        case 'delete_records': dialogtype = 'confirm_dialog'; break;
        };
    }
    else if (target.attr('id') == 'contactmember_operation_list') {
        modeltype = 'contactmember';
        switch (target.val()) {
        case 'remove_data':
        case 'update_from_source':
        case 'combine_each': dialogtype = 'confirm_dialog'; break;
        };
    }
    else if (target.attr('id') == 'ipsegment_operation_list') {
        modeltype = 'ipsegment';
        switch (target.val()) {
        case 'delete_records': dialogtype = 'confirm_dialog'; break;
        };
    }
    else if (target.attr('id') == 'rack_operation_list') {
        modeltype = 'rack';
        switch (target.val()) {
        case 'delete_records': dialogtype = 'confirm_dialog'; break;
        };
    }
    else if (target.attr('id') == 'brick_operation_list') {
        modeltype = 'brick';
        switch (target.val()) {
        case 'status_in_use':
        case 'status_repair':
        case 'status_broken':
        case 'status_stock':
        case 'status_spare': dialogtype = 'confirm_dialog'; break;
        case 'set_heap':
        case 'set_served': dialogtype = 'form_dialog'; break;
        case 'delete_records': dialogtype = 'confirm_dialog'; break;
        };
    }

    if (goto_url != null) {
        load_page(goto_url);
        return null;
    }

    if (modeltype == null || dialogtype == null) {
        show_error_dialog('実装されてない処理です、開発者にご連絡を！', reset_admin_operation_selection);
        return null;
    }
    alter_process(target.val(), modeltype, dialogtype);
}