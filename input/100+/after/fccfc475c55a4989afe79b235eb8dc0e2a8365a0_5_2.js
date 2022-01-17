function() {

        token = $.cookie('structrSessionToken');
        user = $.cookie('structrUser');
        if (debug) console.log('token', token);
        if (debug) console.log('user', user);
        
        $.unblockUI({
            fadeOut: 25
        });

        connect();
	
        main.empty();

        Structr.expanded = $.parseJSON($.cookie('structrTreeExpandedIds'));
        if (debug) console.log('######## Expanded IDs after reload ##########', Structr.expanded);
        if (debug) console.log('expanded ids', $.cookie('structrTreeExpandedIds'));

        ws.onopen = function() {

            if (debug) console.log('logged in? ' + loggedIn);
            if (!loggedIn) {
                if (debug) console.log('no');
                $('#logout_').html('Login');
                Structr.login();
            } else {
                if (debug) console.log('Current user: ' + user);
                $('#logout_').html(' Logout <span class="username">' + (user ? user : '') + '</span>');
				
                Structr.loadInitialModule();
				
            }
        }

    }