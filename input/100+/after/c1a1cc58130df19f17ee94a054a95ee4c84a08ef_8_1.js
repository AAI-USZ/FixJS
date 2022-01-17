function updateUserInfo(request,user){
    var user_info = user.USER;

    var info_tab = {
        title : tr("User information"),
        content :
        '<table id="info_user_table" class="info_table">\
            <thead>\
               <tr><th colspan="2">' + tr("User information") + ' - '+user_info.NAME+'</th></tr>\
            </thead>\
            <tbody>\
            <tr>\
                <td class="key_td">' + tr("ID") + '</td>\
                <td class="value_td">'+user_info.ID+'</td>\
            </tr>\
            <tr>\
                <td class="key_td">' + tr("Group") + '</td>\
                <td class="value_td">'+user_info.GNAME+'</td>\
            </tr>\
            <tr>\
                <td class="key_td">' + tr("Authentication driver") + '</td>\
                <td class="value_td">'+user_info.AUTH_DRIVER+'</td>\
            </tr>\
            </tbody>\
         </table>\
        <table id="user_template_table" class="info_table">\
                <thead><tr><th colspan="2">' + tr("User template") + '</th></tr></thead>'+
            prettyPrintJSON(user_info.TEMPLATE)+
        '</table>'
    };

    var quotas_tab_html = '';

    if (!$.isEmptyObject(user_info.VM_QUOTA))
        quotas_tab_html += '<table class="info_table">\
            <tbody>'+prettyPrintJSON(user_info.VM_QUOTA)+'</tbody>\
          </table>'

    if (!$.isEmptyObject(user_info.DATASTORE_QUOTA))
        quotas_tab_html += '<table class="info_table">\
            <tbody>'+prettyPrintJSON(user_info.DATASTORE_QUOTA)+'</tbody>\
          </table>'

    if (!$.isEmptyObject(user_info.IMAGE_QUOTA))
        quotas_tab_html += '<table class="info_table">\
            <tbody>'+prettyPrintJSON(user_info.IMAGE_QUOTA)+'</tbody>\
          </table>';

    if (!$.isEmptyObject(user_info.NETWORK_QUOTA))
        quotas_tab_html += '<table class="info_table">\
            <tbody>'+prettyPrintJSON(user_info.NETWORK_QUOTA)+'</tbody>\
          </table>';

    var quotas_tab = {
        title : tr("User quotas"),
        content : quotas_tab_html
    };

    Sunstone.updateInfoPanelTab("user_info_panel","user_info_tab",info_tab);
    Sunstone.updateInfoPanelTab("user_info_panel","user_quotas_tab",quotas_tab);
    Sunstone.popUpInfoPanel("user_info_panel");
}