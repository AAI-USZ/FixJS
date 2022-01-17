function(T) {
            //Check if we already have profile and just fire event in this case without showing annoying popup
            if ($$.fjs.twitter.user != null) {
                $$.fjs.fire('org.fjs.twitter.login_status.change', true, true, $$.fjs.twitter.user);
                return true;
            }
            T.signIn();
        }