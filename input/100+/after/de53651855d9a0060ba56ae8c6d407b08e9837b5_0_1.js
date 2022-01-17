function addRoom(roomViewModel) {
        // Do nothing if the room exists
        var roomName = roomViewModel.Name,
            room = getRoomElements(roomViewModel.Name),
            roomId = null,
            viewModel = null,
            $messages = null,
            $roomTopic = null,
            scrollHandler = null,
            userContainer = null;

        if (room.exists()) {
            return false;
        }

        roomId = getRoomId(roomName);

        // Add the tab
        viewModel = {
            id: roomId,
            name: roomName,
            closed: roomViewModel.Closed
        };

        templates.tab.tmpl(viewModel).data('name', roomName).appendTo($tabs);

        $messages = $('<ul/>').attr('id', 'messages-' + roomId)
                              .addClass('messages')
                              .appendTo($chatArea)
                              .hide();

        $roomTopic = $('<div/>').attr('id', 'roomTopic-' + roomId)
                              .addClass('roomTopic')
                              .appendTo($chatArea)
                              .hide();

        if (roomName !== "lobby") {
            userContainer = $('<div/>').attr('id', 'userlist-' + roomId)
                .addClass('users')
                .appendTo($chatArea).hide();
            templates.userlist.tmpl({ listname: '- Room Owners', id: 'userlist-' + roomId + '-owners' })
                .addClass('owners')
                .appendTo(userContainer);
            templates.userlist.tmpl({ listname: '- Online', id: 'userlist-' + roomId + '-active' })
                .addClass('active')
                .appendTo(userContainer);
            templates.userlist.tmpl({ listname: '- Away', id: 'userlist-' + roomId + '-idle' })
                .addClass('idle')
                .appendTo(userContainer);
            userContainer.find('h3').click(function () {
                if ($.trim($(this).text())[0] === '-') {
                    $(this).text($(this).text().replace('-', '+'));
                } else {
                    $(this).text($(this).text().replace('+', '-'));
                }
                $(this).next().toggle(0);
                return false;
            });
        } else {
            $('<ul/>').attr('id', 'userlist-' + roomId)
                .addClass('users')
                .appendTo($chatArea).hide();
        }

        $tabs.find('li')
            .not('.lobby')
            .sortElements(function (a, b) {
                return $(a).data('name').toLowerCase() > $(b).data('name').toLowerCase() ? 1 : -1;
            });

        scrollHandler = function (ev) {
            var messageId = null;

            // Do nothing if there's nothing else
            if ($(this).data('full') === true) {
                return;
            }

            // If you're we're near the top, raise the event
            if ($(this).scrollTop() <= scrollTopThreshold) {
                var $child = $messages.children('.message:first');
                if ($child.length > 0) {
                    messageId = $child.attr('id')
                                      .substr(2); // Remove the "m-"
                    $ui.trigger(ui.events.scrollRoomTop, [{ name: roomName, messageId: messageId}]);
                }
            }
        };

        // Hookup the scroll handler since event delegation doesn't work with scroll events
        $messages.bind('scroll', scrollHandler);

        // Store the scroll handler so we can remove it later
        $messages.data('scrollHandler', scrollHandler);

        setAccessKeys();
        return true;
    }