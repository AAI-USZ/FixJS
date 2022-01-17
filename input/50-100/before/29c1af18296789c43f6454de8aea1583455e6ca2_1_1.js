function flip(player) {
        if ("ownGravity" in player) {
            delete player.ownGravity;
        } else {
            player.ownGravity = -WebSplat.conf.gravity;
        }
        WebSplat.conf.jumpSpeed = -WebSplat.conf.jumpSpeed; // just hope this never gets screwed up :)
    }