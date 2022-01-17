function(e) {
            // Delete the saved refresh token
            var resp = confirm('Logout user ' + ManageUserSession.getUsername() + '?');
            if (resp) {
                logout(false);
            }
        }).touch( function(e) { e.stopPropagation(); }