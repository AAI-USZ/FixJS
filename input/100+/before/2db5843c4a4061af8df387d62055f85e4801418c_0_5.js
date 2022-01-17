function(data) {
    try {
        //Log in db (chatlog table)
        /*if (config.database.usedb) {
        client.query('INSERT INTO ' + config.database.dbname + '.' + config.database.tablenames.chat + ' '
            + 'SET userid = ?, chat = ?, time = NOW()',
            [data.userid, data.text]);
    }*/
        usersList[data.userid].lastActivity = new Date();

        if (data.text == "roll") {
            var roll = Math.ceil(Math.random() * 6);
            if (!alreadyRolled) {
                if (currentsong.djid == data.userid) {
                    alreadyRolled = true;
                    if (roll > 4) {
                        bot.speak(data.name + ', you rolled a ' + roll + ', Awesome!');
                        bot.vote('up');
                    } else if (roll === 1) {
                        bot.speak(data.name + ', you rolled a ' + roll + ', Lame!');
                        bot.vote('down');
                    } else {
                        bot.speak(data.name + ', you rolled a ' + roll + ', bummer.');
                    }
                    bonusvote = true;
                } else {
                    bot.speak("@Uglee roll");
                }
            }
        }

        /* Catch all for the morons that can't read. */
        if (data.text == "!q+" || data.text == "q+" || data.text == "addme" || data.text.match(/^\/addme$/) || data.text.match(/^\/a$/) || data.text.match(/^\!a$/) || data.text.match(/^\/q$/)) {
            AddToQueue(data.userid);
        }

        if (data.text == "!q-" || data.text == "q-") {
            RemoveFromQueue(data.userid);
        }

        if (data.text == "q") {
            QueueStatus();
        }

        if (data.text.substring(0, 2) == "iq") {
            if (data.text == "iq") {
                bot.speak("Usage: iq position username");
            } else {
                var position = data.text.substring(2, 4);
                var username = data.text.substring(5).substring(1);
                console.log("Position: " + position);
                client.query("SELECT `userid` FROM " + config.database.dbname + "." + config.database.tablenames.user + " WHERE `username` = ?", [username], function select(error, results, fields) {
                    AddToQueue(results[0]['userid']);
                });
            }
        }

        if (data.text.substring(0, 2) == "dq") {
            if (data.text == "dq") {
                bot.speak("Usage: dq username");
            } else {
                var username = data.text.substring(3).substring(1);
                console.log(username);
                client.query("SELECT `userid` FROM " + config.database.dbname + "." + config.database.tablenames.user + " WHERE `username` = ?", [username], function select(error, results, fields) {
                    RemoveFromQueue(results[0]['userid']);
                });
            }
        }

        /*var twss = require('twss');
    twss.threshold = 0.9;
    //console.log("Probability: " + twss.prob(data.text));
    if (twss.is(data.text)) {
        var roll1 = Math.ceil(Math.random() * 20);
        //console.log("TWSS roll: " + roll1);
        if (roll1 >= 19) {
            bot.speak("That's what she said!");
        }
    }*/

        if (isBanned(data.userid)) {
            return;
        }

        if (data.text.toLowerCase() == "roll again jerk" && admin(data.userid)) {
            var roll2 = Math.ceil(Math.random() * 6);
            if (roll2 > 4) {
                bot.speak(data.name + ', you rolled a ' + roll2 + ', Awesome!');
                bot.vote('up');
            } else {
                bot.speak(data.name + ', you rolled a ' + roll2 + ', bummer.');
            }
        }

        if ((data.text.toLowerCase() == "/me kicks @uglee") && admin(data.userid)) {
            bot.speak("Fine! *grumble*Jerk*mumble*");
            bot.vote("up");
        }

        if ((data.text.toLowerCase() == "@uglee dance bitch") && admin(data.userid)) {
            bot.vote("up");
        }

        if (data.text.toLowerCase() == "fuck you @uglee") {
            bot.speak("Fuck you too!");
        }

        if (data.text.match(/^\!putmeinthequeuedouchebag$/)) {
            bot.speak("Leave me alone, @ShiningDimLight");
        }

        var result = data.text.match(/^\@(.*?)( .*)?$/);
        if (result) {

            // break out the command and parameter if one exists
            var botName = result[1].trim().toLowerCase();
            var command = '';

            if (result.length == 3 && result[2]) {
                command = result[2].trim().toLowerCase();
            }

            if (config.botName.toLowerCase() == botName) {

                console.log(data.name, " >> ", data.text);

                delete require.cache['./actions.js'];
                var Actions = require('./actions.js');

                if (config.consolelog) {
                    console.log('Command is', command);
                }

                switch (command) {
                case "addsong":
                    addSong(data.userid);
                    break;

                case "votenext":
                    VoteNextSong();
                    break;

                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                    ProcessVote(command);
                    break;

                case "endcts":
                case "stopcts":
                    if (isMod(data.userid)) {
                        if (ctsActive) {
                            ctsActive = false;
                            ctsLastWords = null;
                            bot.speak("Sorry folks, the game is over. Play what you want now.");
                        }
                    }
                    break;

                case "startcts":
                    if (isMod(data.userid)) {
                        if (!ctsActive) {
                            ctsActive = true;
                            bot.speak("We are now playing 'Connect the Songs' each DJ must play a song with at least one word in the title from the previous song title. It will begin with the next song. The best score is currently " + ctsSequenceMax);
                        }
                    }
                    break;

                case "enableq":
                case "enablequeue":
                case "startq":
                case "startqueue":
                    if (isMod(data.userid)) {
                        config.enableQueue = true;
                        bot.speak("We are now using a queue! Sign up using 'q+'.");
                        enableQueueCache();
                    }
                    break;

                case "endq":
                case "endqueue":
                case "stopq":
                case "stopqueue":
                    if (isMod(data.userid)) {
                        config.enableQueue = false;
                        djQueue = { length:0 };
                        bot.speak("There is no queue...");
                        clearQueueCache();
                    }
                    break;

                case "mod":
                    summonModerators();
                    break;

                case "news":
                    bot.speak(announcement);
                    break;

                case "listenercount":
                    bot.speak("There is " + currentsong.listeners + " listeners right now.");
                    break;

                case "ctsmax":
                    bot.speak("The highest 'Connect the Songs' count is: " + ctsSequenceMax);
                    break;

                case "summonbouncer":
                    if (isMod(data.userid)) {
                        summonBouncer();
                    }
                    break;

                case "dismissbouncer":
                    if (admin(data.userid)) {
                        dismissBouncer();
                    }
                    break;

                case "die":
                    killBot(data.userid);
                    break;

                case "userCount":
                    bot.roomInfo(true, function(data) {
                        console.log(data.room.metadata.listeners);
                        bot.speak("Total users in room is: " + data.room.metadata.listeners);
                    });
                    break;

                default:
                    if (command === "") {
                        bot.speak('Yes Master @' + data.name + '? Here is what I can do for you: speak | dance | menu | whois | startcts | stopcts');

                        if (isMod(data.senderid)) {
                            bot.pm("As moderator, you can startq | endq | dq @name | iq pos# @name", data.senderid);
                        }
                    } else {
                        var idx = findAction(command, Actions.chat_responses);
                        if (idx != -1) {
                            bot.speak(Actions.chat_responses[idx].response1.replace("{0}", data.name));
                            if (Actions.chat_responses[idx].response2 !== "") {
                                pause(500);
                                bot.speak(Actions.chat_responses[idx].response2.replace("{0}", data.name));
                            }
                        }
                    }
                }
            }
        }

    } catch (e) {
        console.log("*** Error *** " + e);
    }
}