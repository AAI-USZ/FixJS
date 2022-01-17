function(userdata) {
                userdata.username = username;
                _this.user = new User(userdata);
                var html = '<img src="assets/img/avatar-default-' + (_this.user.gender == 'woman'? 'woman' : 'man') + '.png" /> ' + _this.user.getName();
                JQuery('.navbar a.user').html(html).attr('href', '#username/' + _this.user.username);
                JQuery('#fancybox-close').click();
            }