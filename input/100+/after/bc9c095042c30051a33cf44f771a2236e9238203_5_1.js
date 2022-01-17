function(sakai_comm,
            sakai_content,
            sakai_groups,
            sakai_i18n,
            sakai_l10n,
            sakai_server,
            sakai_user,
            sakai_util,
            sakai_widgets,
            sakai_conf,
            sakai_widget_config) {
    
    return {
        api : {
            Activity : sakai_util.Activity,
            Communication : sakai_comm,
            Content: sakai_content,
            Datetime: sakai_util.Datetime,
            Groups : sakai_groups,
            i18n : sakai_i18n,
            l10n : sakai_l10n,
            Security : sakai_util.Security,
            Server : sakai_server,
            User : sakai_user,
            Util : sakai_util,
            Widgets : sakai_widgets
        },
        config : sakai_conf,
        data : sakai_user.data,
        widgets : sakai_widget_config
    };
}