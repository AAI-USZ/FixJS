function enable() {
    ext.add_exts_menuitem('ext_btn_hotot_stat_image'
        , ext.HototStat.id+'/16.png'
        , 'View Tweet Stat ...'
        , ext.HototStat.on_ext_btn_clicked);
    // create stat dialog
    var title = 'Tweet Stat ...'
    ext.HototStat.stat_dialog 
        = widget.DialogManager.build_dialog('#ext_imagestat_dialog'
            , title, ext.HototStat.header_html, ext.HototStat.body_html
            , [{  id:'#ext_hototstat_close_btn', label: 'Close'
                , click: ext.HototStat.on_btn_close_clicked
               }, {
                  id: '#ext_hototstat_update_btn', label: 'Update'
                , click: ext.HototStat.on_btn_update_clicked
              }]
        );
    ext.HototStat.stat_dialog.set_styles('header', {'padding': '10px'})
    ext.HototStat.stat_dialog.set_styles('body', {'padding': '0px','background-color':'white'})
    ext.HototStat.stat_dialog.resize(700, 500);
    
    var radio_group_btns = new widget.RadioGroup('#ext_hototstat_btns');
    radio_group_btns.on_clicked = function (btn, event) {
        $('#ext_imagestat_dialog .dialog_block').hide();
        $(btn.attr('href')).show();
        ext.HototStat.current = btn.attr('href');
    };
    radio_group_btns.create();

    ext.HototStat.reset();
}