function(T) {
            $$('*[data-fjs-twitter-linkify-users]').each(function() {
                $$.fjs.twitter.linkifyUsers($$(this), $$(this).attr('data-fjs-twitter-linkify-users'));
            });
            $$('*[data-fjs-twitter-hovercards]').each(function() {
                $$.fjs.twitter.hovercards($$(this), $$(this).attr('data-fjs-twitter-hovercards'));
            });
            $$('*[data-fjs-twitter-follow]').each(function() {
                T(this).followButton($$(this).attr('data-fjs-twitter-follow'));
            });
            $$('*[data-fjs-twitter-login-button]').each(function() {
                var bSize = $$(this).attr('data-fjs-twitter-login-button');
                if (!bSize.length)
                    bSize = 'medium';
                T(this).connectButton({size: bSize});
            });
            $$(document).on('click', '*[data-fjs-twitter-login]', function() {
                $$.fjs.twitter.login();
                return false;
            });
            $$(document).on('click', '*[data-fjs-twitter-logout]', function() {
                $$.fjs.twitter.logout();
                return false;
            });
            T.bind("authComplete", function (e, user) {
                $$.fjs.twitter.user = user;
                $$.fjs.fire('org.fjs.twitter.login_status.change', true, true, $$.fjs.twitter.user);
            });
 
            T.bind("signOut", function (e) {
                $$.fjs.twitter.user = null;
                $$.fjs.fire('org.fjs.twitter.login_status.change', false, true);
            });
            $$.fjs.twitter.user = null;
            if (T.isConnected()) {
              $$.fjs.twitter.user = T.currentUser;
            }
            $$.fjs.fire('org.fjs.twitter.login_status.change', T.isConnected(), false, $$.fjs.twitter.user);
        }