f    try {
        if (config.consolelog) {
            console.log('Private message: ', data);
        }

        if (isBanned(data.senderid)) {
            return;
        }

        console.log("PMMED >> ", data.text);
        console.log('Private message: ', data);

        //if (data.text.match(/^Uglee$/) && data.senderid == '4e7bf475a3f7511657030c34') {
        //var reg = RegExp(escape("Uglee"), "i");
        if (data.senderid == '4e7bf475a3f7511657030c34') {
            var query = escape(data.text);
            var reg = RegExp(escape("Uglee"));
            if (reg.test(query)) {
                ammResponded = true;
                console.log("AMM Responded");
            }
        }

        var result = data.text.match(/^(.*?)( .*)?$/);
        if (result) {
            // break out the command and parameter if one exists
            var command = result[1].trim().toLowerCase();
            var param = '';
            if (result.length == 3 && result[2]) {
                param = result[2].trim().toLowerCase();
            }
            // handle valid commands
            if (config.consolelog) {
                console.log('Command: ', command);
                console.log('Param: ', param);
            }

            switch (command) {
            case "die":
                killBot(data.senderid);
                break;

            case "addsong":
                addSong(data.senderid);
                break;

            case "summonbouncer":
                if (isMod(data.senderid)) {
                    summonBouncer();
                }
                break;

            case "dismissbouncer":
                if (admin(data.senderid)) {
                    dismissBouncer();
                }
                break;

            case "news":
                bot.speak(announcement);
                break;

            case "djwarn":
                mustAwesome(param);
                break;

            case "stepup":
                if (admin(data.senderid)) {
                    stepUp();
                }
                break;

            case "stepdown":
                if (admin(data.senderid)) {
                    stepDown();
                }
                break;

            case "skip":
                if (admin(data.senderid)) {
                    bot.skip();
                }
                break;

            case "test":

                break;

            case "votenext":
                VoteNextSong();
                break;

            case "roll":
                var roll2 = Math.ceil(Math.random() * 6);
                if (roll2 > 4) {
                    bot.speak('A ' + roll2 + ' has been rolled on your behalf, Awesome!');
                    bot.vote('up');
                } else {
                    bot.speak('A ' + roll2 + ' has been rolled on your behalf, bummer.');
                }
                break;

            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
                ProcessVote(command);
                break;

            case "autodj":
                if (admin(data.senderid)) {
                    config.autodj = param;
                    bot.pm("Autodj set to: " + config.autodj, data.senderid);
                }
                break;

            case "autobop":
                if (admin(data.senderid)) {
                    config.autobop = param;
                    bot.pm("Autobop set to: " + config.autobop, data.senderid);
                }
                break;

            case "setlaptop":
                bot.modifyLaptop(param);
                break;

            case "avatar":
                bot.setAvatar(param);
                break;

            case "speak":
                if (isMod(data.senderid)) {
                    bot.speak(param);
                }
                break;

            case "findidle":
                if (isMod(data.senderid)) {
                    findIdle(data.senderid);
                }
                break;

            case "goto":
                if (admin(data.senderid)) {
                    if (param == "amm") {
                        bot.roomDeregister();
                        bot.roomRegister('4ea390ac14169c0cc3caa078');
                    }
                    /*else if (param == "maw") {
                    bot.roomDeregister();
                    bot.roomRegister('4ef82538590ca23e33001b3b');
                } else if (param == "bootcamp") {
                    bot.roomDeregister();
                    bot.roomRegister('4f46ecd8590ca24b66000bfb');
                } else if (param == "tgshuffle") {
                    bot.roomDeregister();
                    bot.roomRegister('4f5e1e11590ca246db01e6fc');
                }*/
                    else if (param == "vip") {
                        bot.roomDeregister();
                        bot.roomRegister('4f73ef36eb35c10888004976');
                    } else if (param == "hothits") {
                        bot.roomDeregister();
                        bot.roomRegister("4f5f162268f554664cc5b2c4");
                    }
                    /*else if (param == "campfire") {
                    bot.speak("The campfire is lit! See you there! http://murl.me/campfire");
                    bot.roomDeregister();
                    bot.roomRegister('4f6c119d68f5540c6d1dd67d');
                }*/
                    else {
                        bot.roomDeregister();
                        bot.roomRegister(param);
                    }
                }
                break;

            case "help":
                if (isMod(data.senderid)) {
                    bot.pm("You can awesome (or a) | lame (or l) | djwarn 1 | djwarn 2 | findidle | summonbouncer", data.senderid);
                }
                if (admin(data.senderid)) {
                    pause(500);
                    bot.pm("roll | step up | step down | skip | die | summonbouncer | dismissbouncer", data.senderid);
                }
                break;
            }
        }

    } catch (e) {
        console.log("*** Error *** " + e);
    }
});
