function readyListener(e) {
            //
            $('#app-message').text('').removeClass("error success text");
            //
            UPC = net.user1.orbiter.UPC;
            // listeners
            msgManager.addMessageListener(UPC.JOINED_ROOM, joinedRoomListener, this);
            msgManager.addMessageListener("STATE_MESSAGE", stateListener, this, [roomID]);
            msgManager.addMessageListener(UPC.JOIN_ROOM_RESULT, joinRoomResultListener, this);
            //
            clientID = orbiter.getClientID();
            // Join the game room
            msgManager.sendUPC(UPC.JOIN_ROOM, roomID);
        }