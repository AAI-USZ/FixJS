function (room) {
        populateLobbyRooms();
        ui.addMessage('Room \'' + room + '\' is now closed', 'notification', this.activeRoom);

        ui.closeRoom(room);

        if (this.activeRoom === room) {
            ui.toggleMessageSection(true);
        }
    }