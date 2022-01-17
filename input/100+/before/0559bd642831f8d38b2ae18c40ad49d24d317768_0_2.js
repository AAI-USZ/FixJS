function alter_process(ope, modeltype, dialogtype) {
    var oidlist = $.map($('#selections').children(), function(item){return $(item).attr('title');}).join('-');
    var success_callback = null;
    if (dialogtype == 'confirm_dialog') {
        success_callback = function(data, dataType){
            show_confirm_dialog(data, function(){
                $.ajax({
                    url: '/ybz/' + modeltype + '/alter-execute/' + ope + '/' + oidlist,
                    type: 'POST',
                    error: function(xhr){show_error_dialog(xhr.responseText, reset_admin_operation_selection);},
                    success: function(data, dataType){show_success_dialog('処理に成功しました', data, reload_page);}
                });}, reset_admin_operation_selection);
        };
    }
    else if (dialogtype == 'form_dialog') {
        success_callback = function(data, dataType){
            show_form_dialog('/ybz/' + modeltype + '/alter-execute/' + ope + '/' + oidlist, data, reload_page, reset_admin_operation_selection);
        };
    }
    $.ajax({
        url: '/ybz/' + modeltype + '/alter-prepare/' + ope + '/' + oidlist,
        type: 'POST',
        error: function(xhr, textStatus, error){show_error_dialog(xhr.responseText, reset_admin_operation_selection);},
        success: success_callback
    });
}