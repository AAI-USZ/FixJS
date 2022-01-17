function (room) {
        populateLobbyRooms();
        ui.addMessage('Room \'' + room + '\' is now open', 'notification', this.activeRoom);

        ui.unCloseRoom(room);

        if (this.activeRoom === room) {
            ui.toggleMessageSection(room.closed());
        }
    }