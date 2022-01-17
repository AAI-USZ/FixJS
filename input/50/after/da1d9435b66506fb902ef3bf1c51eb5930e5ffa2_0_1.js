function init_publicator(datas)
{
     var dialog = p4.Dialog.Create({
                size:'Full',
                title:'Bridge',
                loading: false
            });

    dialog.load('/prod/bridge/manager/', 'POST', datas);
}