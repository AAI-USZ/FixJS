function(userdata) {
                        Log('info', 'Showing user modal for ' + username);
                        userdata.username = username;
                        var u = new User(userdata);
                        u.streams = userdata;
                        Frontend.userModal.show(html, u);

                    }