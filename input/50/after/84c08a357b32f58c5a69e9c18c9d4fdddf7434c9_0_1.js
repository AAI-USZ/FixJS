function (success) {
                if (success === false) {
                    $.cookie('userid', '');
                    addMessage('Choose a name using "/nick nickname".', 'notification');
                }
                addMessage('After that, you can view rooms using "/rooms" and join a room using "/join roomname".', 'notification');
            }