function(result) {

                if (result.cancelled) {
                    // user cancelled code reading operation
                    $('#app-message').text('Koodia ei luettu!').removeClass("text success").addClass("error");
                } else {
                    // read json string
                    var obj = jQuery.parseJSON(result.text);

                    if (!obj || result.format == "INVALID_TYPE") {
                        // json string invalid
                        $('#app-message').text('Koodi oli virheellinen!').addClass("error").removeClass("text success");
                    } else {
                        console.log(result.text);
                        // join
                        if (obj.action == "join") { // join
                            $('#app-message').text('Liitytään peliin.').removeClass("error success").addClass("text");

                            // union init
                            roomID = obj.roomId;
                            User.team_id = (typeof obj.tid !== "undefined") ? obj.tid : 0; // teamID
                            
                            init();
                        }
                        // leave
                        else if (obj.action == "close") { // close
                            if ( !! roomID && roomID == obj.roomId) {
                                $('#app-message').text('').removeClass("error success text");
                                // send message to game
                                msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", obj.roomId, null, "CLOSE");
                                //msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", obj.roomId, "false", "close"); // null,
                            } else {
                                $('#app-message').text('Vain peliin liittynyt pelaaja voi sulkea pelin!').removeClass("success text").addClass("error");
                            }
                        }
                        // open
                        else if (obj.action == "open") { // open
                            $('#app-message').text('Avataan peliä.').addClass("text").removeClass("error success");

                            roomID = obj.roomId; // roomID
                            gameID = obj.gameId; // gameID
                            User.lobby = true;

                            init();

                        }
                        // start game
                        else if (obj.action == "start") { // start
                            $('#app-message').text('').removeClass("text error success");

                            if (typeof msgManager !== "undefined" && roomID == obj.roomId) {
                                //
                                msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", obj.roomId, null, "START");
                                //msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", obj.roomId, "false", "start"); // null,
                            } else {
                                // error if not joined first
                                $('#app-message').text("Vain peliin liittyneet voivat aloittaa pelin!").removeClass("text success").addClass("error");
                            }

                        } else {
                            $('#app-message').text('Luettu koodi:' + result.text).removeClass("error success").addClass("text");
                        }
                    }
                } /* alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled); */
            }