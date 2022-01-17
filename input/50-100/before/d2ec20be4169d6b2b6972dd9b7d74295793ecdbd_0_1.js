function (success) {
                    if (success === false) {
                        if (ui.showLogin() === true) {
                            ui.addMessage('Type /login to show the login screen', 'notification');
                        }
                        else {
                            ui.addMessage('Use /nick user password to log in with jabbr', 'notification');
                            ui.addMessage('To enable janrain login, setup the missing values in web.config', 'notification');
                        }
                    }
                    // get list of available commands
                    chat.getCommands()
                        .done(function (commands) {
                            ui.setCommands(commands);
                        });
                }