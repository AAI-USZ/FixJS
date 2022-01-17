function() {
    // Setup Ajax defaults
    BBBUtils.setupAjax();
    
    // Process parameters
    var arg = BBBUtils.getParameters(); 
    if(!arg || !arg.siteId) {
        BBBUtils.showMessage(bbb_err_no_siteid, 'error');
        return;
    }
    bbbSiteId = arg.siteId;
    bbbCurrentUser = BBBUtils.getCurrentUser();
    bbbUserPerms = new BBBPermissions(BBBUtils.getUserPermissions());
    
    // We need the toolbar in a template so we can swap in the translations
    BBBUtils.render('bbb_toolbar_template',{},'bbb_toolbar');
    
    bbbInterval = BBBUtils.autorefreshInterval();
	bbbAddUpdateFormConfigParameters = BBBUtils.addUpdateFormConfigParameters();
    
    $('#bbb_home_link').bind('click',function(e) {
        return switchState('currentMeetings');
    });

    $('#bbb_create_meeting_link').bind('click',function(e) {
        return switchState('addUpdateMeeting');
    });

    $('#bbb_end_meetings_link').bind('click',BBBUtils.endAllMeetingsForCurrentSite);

    $('#bbb_permissions_link').bind('click',function(e) {
        return switchState('permissions');
    });

    $('#bbb_recordings_link').bind('click',function(e) {
        return switchState('recordings');
    });
    
    // This is always showing in every state.
    $('#bbb_home_link').show();
    $('#bbb_recordings_link').show();

    // Now switch into the requested state
    if(bbbCurrentUser != null) {
        switchState(arg.state,arg);
    } else {
        BBBUtils.showMessage(bbb_err_no_user, 'error');
        jQuery('#bbb_container').empty();
    }
    
    // If configured, show text notice (first time access)
    BBBUtils.addNotice();
}