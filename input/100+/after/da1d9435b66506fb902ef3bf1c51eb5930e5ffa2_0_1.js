function publicator_reload_publicator()
{
    var options = $('#dialog_publicator form[name="current_datas"]').serializeArray();
    var dialog = p4.Dialog.get(1);
    dialog.load('/prod/bridge/manager/', 'POST', options);
}