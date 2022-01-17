function() {

    dmp = new diff_match_patch()
    if (debug) console.log('Debug mode');
    header = $('#header');
    main = $('#main');
        
    $('#import_json').on('click', function(e) {
        e.stopPropagation();
        var jsonArray = $.parseJSON($('#json_input').val());
        $(jsonArray).each(function(i, json) {
            //console.log(json);
            createEntity(json);
        });
    });
    
    $('#loginButton').on('click', function(e) {
        e.stopPropagation();
        var username = $('#usernameField').val();
        var password = $('#passwordField').val();
        Structr.doLogin(username, password);
    });
    $('#logout_').on('click', function(e) {
        e.stopPropagation();
        Structr.doLogout();
    });

    $('#dashboard_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('dashboard');
        Structr.modules['dashboard'].onload();
    });

    $('#pages_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('pages');
        Structr.modules['pages'].onload();
        _Pages.resize();
    });

    _Pages.makeMenuDroppable();

    $('#components_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('components');
        Structr.modules['components'].onload();
    });

    $('#elements_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('elements');
        Structr.modules['elements'].onload();
    });

    $('#contents_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('contents');
        Structr.modules['contents'].onload();
    });

    $('#files_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('files');
        Structr.modules['files'].onload();
    });

    $('#usersAndGroups_').on('click', function(e) {
        e.stopPropagation();
        main.empty();
        Structr.activateMenuEntry('usersAndGroups');
        Structr.modules['usersAndGroups'].onload();
    });

    $('#usernameField').keypress(function(e) {
        e.stopPropagation();
        if (e.which == 13) {
            jQuery(this).blur();
            jQuery('#loginButton').focus().click();
        }
    });
    $('#passwordField').keypress(function(e) {
        e.stopPropagation();
        if (e.which == 13) {
            jQuery(this).blur();
            jQuery('#loginButton').focus().click();
        }
    });
	
    Structr.init();

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $('#dialogBox .dialogCancelButton').click();
        }
    });            
	
}