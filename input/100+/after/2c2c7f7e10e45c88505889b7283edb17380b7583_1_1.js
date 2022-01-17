function(username) {
                    var successFunc = function(json) {
                            var icon = new ValidIconClass('usernameicon');
                            if (json) {
                                icon.showValid();
                                pl('#personalinfomsg').text('');
                            }
                            else {
                                icon.showInvalid();
                                pl('#personalinfomsg').html('<span class="attention">Nickname already taken, please choose another</span>');
                            } 
                        },
                        icon = new ValidIconClass('usernameicon'),
                        ajax;
                    if (!username || !username.length) {
                        return 'Nickname must not be empty';
                    }
                    else if (username.length < 3) {
                        return 'Nickname must be at least three characters';
                    }
                    else if (username.length > 30) {
                        return 'Nickname must be no more than 30 characters';
                    }
                    else {
                        ajax = new AjaxClass('/user/check_user_name', 'personalinfomsg', null, successFunc);
                        ajax.setGetData({ name: username });
                        ajax.call();
                    }
                    return 0;
                }