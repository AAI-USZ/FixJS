function receivedNewMessage(chat) {
        // Make sure we only add a message once.
        if (ids[chat.id])
            return;
        ids[chat.id] = true;

        // Update our query so we only get new messages.
        pingData.where = { updated_at: { '$gt': chat.updated_at } };

        // Add the chat message to the window.
        var row = Ti.UI.createTableViewRow({
        });
        var container = Ti.UI.createView({
            height: 'auto',
            backgroundColor: '#fff',
            borderColor: '#ccc', borderWeight: 1
        });
        container.add(Ti.UI.createLabel({
            text: chat.from.first_name + ' ' + chat.from.last_name, textAlign: 'left',
            top: 10 + u, right: 10 + u, left: 10 + u,
            font: { fontSize: 9, fontWeight: 'bold' },
            height: 10 + u
        }));
        container.add(Ti.UI.createLabel({
            text: new Date(chat.updated_at).toLocaleTimeString(),
            top: 10 + u, right: 10 + u,
            font: { fontSize: 8 },
            height: 10 + u, width: 'auto'
        }));
        container.add(Ti.UI.createLabel({
            text: chat.message, textAlign: 'left',
            height: 'auto',
            top: 20 + u, right: 10 + u, left: 10 + u, bottom: 10 + u
        }));
        row.add(container);
        if (tableView.data.length == 0) {
            tableView.appendRow(row);
        }
        else {
            tableView.insertRowBefore(0, row);
        }
    }