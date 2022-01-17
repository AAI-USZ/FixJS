function go() {
        callHandlers("preload", []);

        var player;

        var html = document.getElementsByTagName("HTML");
        if (html.length > 0) html[0].style.overflowX = "hidden";
        document.body.style.overflowX = "hidden";
    
        initElementPositions(function() {
            player = wpthis.player = new Player();
            addSprite(player);

            var keydown = function(ev) {
                if (ev.ctrlKey || ev.altKey || ev.metaKey) return true;
                if (player.dead) return true;
                switch (ev.which) {
                    case 37: // left
                    case 65: // a
                        player.xacc = -1;
                        player.xaccmax = wpConf.moveSpeed * -1;
                        break;
            
                    case 39: // right
                    case 68: // d
                        player.xacc = 1;
                        player.xaccmax = wpConf.moveSpeed;
                        break;
            
                    case 38: // up
                    case 87: // w
                        if ("pressingUp" in player) break;
                        player.pressingUp = true;
                        if (player.on !== null) {
                            player.jump++;
                            player.on = null;
                            player.yvel = -wpConf.jumpSpeed;
                        } else if (player.jump <= 1) {
                            player.jump = 2;
                            player.powerJump = true;
                            player.yvel = -wpConf.jumpSpeed;
                        }
                        break;
            
                    case 40: // down
                    case 83: // s
                        if (player.on !== null) {
                            player.mode = "jfc";
                            player.frame = 0;
                            for (var i = 0; i < player.on.length; i++) {
                                player.thru[player.on[i].wpID] = true;
                            }
                            player.on = null;
                        }
                        break;

                    case 70: // f
                    case 32: // space
                        player.specialOn();
                        break;
                }
            
                ev.stopPropagation();
                return false;
            }
            $(document.body).keydown(keydown);
            $(window).keydown(keydown);
            
            var keyup = function(ev) {
                switch (ev.which) {
                    case 37: // left
                    case 65: // a
                        if (player.xacc < 0) {
                            player.xacc = false;
                            player.xaccmax = false;
                        }
                        break;
            
                    case 39: // right
                    case 68: // d
                        if (player.xacc > 0) {
                            player.xacc = false;
                            player.xaccmax = false;
                        }
                        break;
            
                    case 38: // up
                    case 87: // w
                        delete player.pressingUp;
                        break;
            
                    case 40: // down
                    case 83: // s
                        break;

                    case 70: // f
                    case 32: // space
                        player.specialOff();
                        break;
                }
            
                ev.stopPropagation();
                return false;
            }
            $(document.body).keyup(keyup);
            $(window).keyup(keyup);

            // prevent resizing (it's cheating!)
            var origW = $(window).width();
            var origH = $(window).height();
            $(window).resize(function(event) {
                if ($(window).width() == origW && $(window).height() == origH) {
                    // spurious
                    return;
                }

                // no resizing!
                player.dead = true;
            });

            // put the player in the starting position
            player.setXY(Math.floor($(window).width()/2), player.h*2);
            player.startingPosition();

            // finish loading
            callHandlers("postload", [player]);
            wpDisplayMessage();

            // and go
            spritesGo();
        });
    }