function(username, token) {
            $("#streams").attr('href', '#stream/' + username);
            _this.api = new Api(token);
            _this.api.get_object_by_key('user', username, function(userdata) {
                userdata.username = username;
                _this.user = new User(userdata);
                var html = '<img src="assets/img/avatar-default-' + (_this.user.gender == 'woman'? 'woman' : 'man') + '.png" /> ' + _this.user.getName() + '<b class="caret"></ b>';
                JQuery('a#dropdown-text').html(html);
                JQuery('a#account').attr('href', '#user/' + _this.user.username);
                $('#dropdown-text').attr('data-toggle', 'dropdown');
                this.user = _this.user

            }, true);

        }