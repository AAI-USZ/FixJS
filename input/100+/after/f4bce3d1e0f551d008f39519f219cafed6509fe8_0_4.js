function($) {

        //==============================================================================
        // VARIABLES = Union & PhoneGap & GameController
        //==============================================================================
        // user object for user vars
        var User = {};
        User.lobby = false;

        // union vars
        var orbiter;
        var msgManager;
        var connManager;
        var UPC;
        var roomID;
        var client;
        var clientID;
        var player;
        var gameState;

        // var lobbyID;
        var gameID;

        // acceleration vars
        var oldx = 0;
        var oldy = 0;
        var oldz = 0;

        // the watch id references the current `watchAcceleration`
        var watchID = null;

        //==============================================================================
        // FORM ACTIONS
        //==============================================================================
        $(document).bind('pagebeforechange', function(event, data) {
            // prevent pagechange when form is submitted
            if (typeof data.toPage === "string") {
                if (data.toPage != "#app-page" && data.toPage != "#login-page" && data.toPage != "file:///android_asset/www/index.html#login-page") {
                    event.preventDefault();
                }

                if (data.toPage == "#login-page" || data.toPage == "file:///android_asset/www/index.html#login-page") {
                    User = {};

                    if (typeof msgManager !== "undefined") {
                        msgManager.sendUPC(UPC.LEAVE_ROOM, roomID);
                    }

                    roomID = 0;
                }
            }
        });

        $("#login").live("tap", function(event) {

            // get form values
            var $form = $(event.target).closest('form'),
                $url = $form.attr('action');

            // check that every field is filled
            var error = 0;
            $('input').each(function(index) {
                if (!$(this).val().length) {
                    $(this).addClass('error');
                    error = 1;
                } else {
                    $(this).removeClass('error');
                }
            });

            // if error give message and return
            if (error) {
                //
                $('#login-message').text('Kirjautuaksesi täytä käyttäjätunnus ja salasana').addClass("error");
                $('#login-message').bind('tap', function(event) {
                    $(this).text('').removeClass("error");
                    $('input[type="text"], input[type="password"]').removeClass('error');
                });
                return false;
            }

            // clear possible message from progress elements
            $('#login-message').text('').removeClass("error");

            // call join func
            login($url, $form);

            // returning something
            return false;
        });

        $("#read").live("tap", function(event) {

            $('#app-message').text('').removeClass("text error success");

            window.plugins.barcodeScanner.scan(function(result) {

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

                            // if not connected then make a new connection to union
                            if(typeof msgManager === "undefined") {
                                roomID = obj.roomId;
                                init();
                            }

                            if ( !! roomID && roomID == obj.roomId) {
                                $('#app-message').text('').removeClass("error success text");
                                // send message to game
                                msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", obj.roomId, null, "CLOSE");
                            } else {
                                //
                                $('#app-message').text('Virhe! Et voinut sulkea peliä.').removeClass("success text").addClass("error");
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

                            // if not connected then make a new connection to union
                            if (typeof msgManager === "undefined") {
                                roomID = obj.roomId;
                                init();
                            }

                            if (typeof msgManager !== "undefined" && roomID == obj.roomId) {
                                //
                                msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", obj.roomId, null, "START");
                            } else {
                                //
                                $('#app-message').text("Virhe! Et voinut aloittaa peliä.").removeClass("text success").addClass("error");
                            }

                        } else {
                            $('#app-message').text('Luettu koodi:' + result.text).removeClass("error success").addClass("text");
                        }
                    }
                } /* alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled); */
            }, function(error) {
                $('#app-message').text("Koodin lukeminen epäonnistui (" + error + ")").removeClass("text success").addClass("error");
            });

        });

        //==============================================================================
        // LOGIN FUNCTION
        //==============================================================================

        function login($url, $form) {

            $.ajax({
                type: 'POST',
                url: $url,
                data: $form.serialize(),
                dataType: 'xml',
                cache: false,
                beforeSend: function() {
                    $('#login-message').text('Kirjaudutaan galaksiin...').removeClass("error success").addClass("text");
                },
                success: function(data) {
                    // xml data var
                    var $xml = $(data);

                    if ($xml.text() === '0') {
                        // 0 as xml value means that auth went wrong
                        $('#login-message').text('Käyttäjätunnus tai salasana oli virheellinen!').removeClass("text success").addClass("error");
                        $('#login-message').bind('tap', function(event) {
                            $(this).text('').removeClass("error");
                            $('input[type="text"], input[type="password"]').removeClass('error');
                        });

                    } else if ($xml.text() == 1) {

                        $('#login-message').text('Kirjautuminen onnistui!').addClass("success").addClass("error text");

                        // 1 as xml value means that auth ok
                        // user information from xml var
                        var $user = $xml.find('user');
                        // set user info to User obj
                        User.username = $user.attr('username');
                        User.nickname = $user.attr('nickname');
                        User.user_id = $user.attr('id');

                        // set username in localStorage for the next time
                        window.localStorage.setItem('username', User.username);

                        $('#login-message').text('').removeClass("text success error");

                        $('#app-message').text('').removeClass("text success error");
                        $('#app-message').text('Heippa ' + User.nickname + "!").removeClass("error text").addClass("success");

                        $.mobile.changePage('#app-page');

                    } else {
                        // xml is not readable so probably something wrong with sportti server or there is some connection problem
                        $('#login-message').text('Verkkovirhe kirjauduttaessa peliin!').addClass("error").removeClass("text success");
                        $('#login-message').bind('tap', function(event) {
                            $(this).text('').removeClass("error");
                            $('input[type="text"], input[type="password"]').removeClass('error');
                        });

                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#login-message').text('Verkkovirhe kirjauduttaessa peliin').addClass("error").removeClass("success text");
                    $('#login-message').bind('tap', function(event) {
                        $(this).text('').removeClass("error");
                        $('input[type="text"], input[type="password"]').removeClass('error');
                    });
                }
            });

            return false;
        }

        //==============================================================================
        // LEAVE FUNCTION
        //==============================================================================

        function leave() {

            User = {};

            orbiter.leave();

            orbiter.disconnect();

            roomID = 0;

            $.mobile.changePage('#login-page');

            return false;
        }

        //==============================================================================
        // INITIALIZATION
        //==============================================================================
        // Wait for PhoneGap to load function onLoad() { document.addEventListener("deviceready", onDeviceReady, false); }
        // PhoneGap is ready function onDeviceReady() { init(); }

        function init() {
            //
            // roomID = $('#roomid').val();
            // Create Orbiter object
            orbiter = new net.user1.orbiter.Orbiter();
            // Register for connection events
            orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
            orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);
            // Register for incoming messages from Union
            msgManager = orbiter.getMessageManager();

            if (typeof WebSocket === "undefined") {
                console.log("SOCKET: NO SOCKET SUPPORT");
            }

            // orbiter.disableHTTPFailover();
            // Connect to Union
            orbiter.connect("socket.dreamschool.fi", 443);
        }

        function clearMessage() {
            $('#app-message').text('').removeClass("error text success");
        }

        //==============================================================================
        //  ROOM EVENT LISTENER
        //==============================================================================
        // Triggered when a JOINED_ROOM message is received

        function joinedRoomListener() {
            if (User.lobby) {
                console.log('ROOMID ' + roomID + ' GAMEID ' + gameID);
                //
                $('#app-message').text('Avataan peliä...').removeClass("error text").addClass("success");
                //
                msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "GAME_MESSAGE", roomID, "false", gameID); // null,
                //
                setTimeout(clearMessage(), 3000);
                //
                User.lobby = false;
            } else {
                //console.log('JOINED ROOM LISTENER : LOBBY FALSE');
                // set user´s information
                var userinfo = User.user_id + ';' + User.username + ';' + User.nickname + ";" + User.team_id;
                // send user´s information
                msgManager.sendUPC(UPC.SET_CLIENT_ATTR, orbiter.getClientID(), "", "USERINFO", userinfo, roomID, "4");
                //
                $('#app-message').text('Liityit peliin!').removeClass("error text").addClass("success");
            }
        }

        //==============================================================================
        // ORBITER EVENT LISTENERS
        //==============================================================================
        // Triggered when the connection is ready


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

        // Triggered when the connection is closed


        function closeListener(e) {
            // TODO tarkempi syy miksi katkesi > kuten joinissa
            $('#app-message').text('Poistuit pelihuoneesta!').addClass("error").removeClass("text success");
        }

        // Triggered when the user has joined the room

        function joinRoomResultListener(roomID, status) {
            var err = 0,
                msg = "";

            switch (status) {
            case "ROOM_NOT_FOUND":
                msg = "Pelihuonetta ei löytynyt!";
                err = 1;
                break;
            case "ERROR":
                msg = "Palvelimella tapahtui virhe!";
                err = 1;
                break;
            case "ROOM_FULL":
                msg = "Pelihuone on täynnä!";
                err = 1;
                break;
            case "ALREADY_IN_ROOM":
                msg = "Olet jo pelihuoneessa!";
                err = 1;
                break;
            }

            if (err) {
                $('#app-message').text(msg).addClass("error").removeClass("text success");
            }

            return;
        }

        //==============================================================================
        // GAME STATE LISTENER
        //==============================================================================

        function stateListener(fromGame, stateMsg) {
            if (stateMsg == "play") {
                gameState = "play";
                startWatch();
            } else {
                gameState = "pause";
                // stopWatch();
            }
        }

        //==============================================================================
        // ACCELERATION STUFF
        //==============================================================================
        // Start watching the acceleration


        function startWatch() {
            // Update acceleration
            var options = {
                frequency: 120
            };
            watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        }

        // Stop watching the acceleration


        function stopWatch() {
            if (watchID) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
        }

        // onSuccess: Get a snapshot of the current acceleration


        function onSuccess(acceleration) {
            //console.log('onSuccess acceleration' + acceleration.x + ' ' + acceleration.y + ' ' + acceleration.y);
            activateClient(acceleration.x, acceleration.y, acceleration.z);
        }

        // onError: Failed to get the acceleration


        function onError() {
            //console.log('onError acceleration');
            $('#app-message').text('Kiihtyvyysanturin käyttäminen ei onnistunut!').addClass("error").removeClass("text success");
        }

        // remember values for jump action
        var max_pituus = 0,
            in_air = 0;

        // reset values after a jump

        function reset_in_air() {
            in_air = 0;
            max_pituus = 0;
        }

        function activateClient(ax, ay, az) {
            var xx = (ax - oldx) * (ax - oldx);
            var yy = (ay - oldy) * (ay - oldy);
            var zz = (az - oldz) * (az - oldz);
            var sum = xx + yy + zz;
            var pituus = Math.abs(Math.sqrt(sum));

            pituus = Math.round(pituus);

            //console.log('pituus' + pituus);
            // if new value > old max value
            if (pituus > max_pituus) {
                max_pituus = pituus;
            }

            if (max_pituus >= 20 && max_pituus > pituus) {
                if (!in_air) {
                    msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "MOVE_MESSAGE", roomID, null, "jump;" + max_pituus);
                    // console.log('MOVE_MESSAGE _ JUMP ' + max_pituus)
                    in_air = 1;
                    setTimeout(reset_in_air, 500);
                }

            } else if ((pituus < 18) && (pituus > 10)) {
                // console.log('MOVE_MESSAGE _ RUN ' + pituus)
                msgManager.sendUPC(UPC.SEND_MESSAGE_TO_CLIENTS, "MOVE_MESSAGE", roomID, null, "run;" + pituus);
            } else {
                oldx = ax;
                oldy = ay;
                oldz = az;
            }
            oldx = ax;
            oldy = ay;
            oldz = az;
        }

        function toggle(obj) {
            var el = document.getElementById(obj);

            if (el.style.display != 'none') {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        }

        function roundNumber(num) {
            var dec = 5;
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }

        var state = "";

        function check_network() {
            var networkState = navigator.network.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.NONE] = 'No network connection';

            if (states[networkState] != state) {
                // console.log('Connection state changed to: ' + states[networkState]);
                state = states[networkState];
            }

            // console.log('Connection state: ' + states[networkState]);
        }

        // setInterval(check_network, 4000);
        // set username ready if used before
        (function user_vars() {
            var uname = window.localStorage.getItem('username');
            if ( !! uname) {
                $('#username').val(uname);
            }
        })();

        // run every time when page is unloaded a.k.a changed/leaved
        $(window).unload(function() {
            if (typeof msgManager !== "undefined") {
                msgManager.sendUPC(UPC.LEAVE_ROOM, roomID);
            }
        });

    }