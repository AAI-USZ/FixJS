function(data) {
                if ('error' in data) {
                    Log('info', 'Could not log in: ' + data.error);
                    lambda_error(data.error);
                } else {
                    Storage.save('token', data.token);
                    Storage.save('username', username);

                    _this.tokenLogin(username, data.token);
                    lambda();
                    JQuery('#fancybox-close').click();
                    JQuery('#dropdown-text').unbind('click.fb');
                }
            }