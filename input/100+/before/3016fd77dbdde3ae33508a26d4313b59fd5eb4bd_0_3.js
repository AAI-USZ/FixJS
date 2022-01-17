function tourCommand(src, command, commandData) {

    try {

        if (isTourOwner(src)) {

            if (command == "clearrankings") {

                sys.writeToFile("tourscores.txt", "")

                sys.writeToFile("tourdetails.txt", "")

                var tiers = sys.getTierList()

                for (var x in tiers) {

                    sys.writeToFile("tourscores_"+tiers[x].replace(/ /g,"_")+".txt","")

                }

                sendBotAll(sys.name(src)+" cleared the tour rankings!",tourschan,false)

                return true;

            }

            if (command == "resettours") {

                tours = {"queue": [], "globaltime": 0, "key": 0, "keys": [], "tour": {}, "history": [], "touradmins": [], "subscriptions": {}, "activetas": [], "activehistory": [], "tourmutes": {}};

                sendBotAll(sys.name(src)+" reset the tour system!",tourschan,false)

                return true;

            }

            if (command == "evalvars") {

                dumpVars(src)

                return true;

            }

            if (command == "fullleaderboard") {

                try {

                    if (commandData == "") {

                        var rankings = sys.getFileContent("tourscores.txt").split("\n")

                    }

                    else {

                        var tiers = sys.getTierList()

                        var found = false;

                        for (var x in tiers) {

                            if (tiers[x].toLowerCase() == commandData.toLowerCase()) {

                                var tourtier = tiers[x];

                                found = true;

                                break;

                            }

                        }

                        if (!found) {

                            throw ("Not a valid tier")

                        }

                        var rankings = sys.getFileContent("tourscores_"+tourtier.replace(/ /g,"_")+".txt").split("\n")

                    }

                    var list = [];

                    for (var p in rankings) {

                        if (rankings[p] == "") continue;

                        var rankingdata = rankings[p].split(":::",2)

                        if (rankingdata[1] < 1) continue;

                        list.push([rankingdata[1], rankingdata[0]]);

                    }

                    list.sort(function(a,b) { return b[0] - a[0] ; });

                    sys.sendMessage(src, "*** FULL TOURNAMENT RANKINGS "+(commandData != "" ? "("+commandData+") " : "")+"***",tourschan)

                    var rankkey = [0, 0] // rank, points

                    for (var x=0; x<65536; x++) {

                        if (x >= list.length) break;

                        if (rankkey[1] === parseInt((list[x])[0])) {

                            sys.sendMessage(src, "#"+rankkey[0]+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                        }

                        else {

                            sys.sendMessage(src, "#"+(x+1)+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                            rankkey = [x+1, parseInt((list[x])[0])]

                        }

                    }

                }

                catch (err) {

                    if (err == "Not a valid tier") {

                        sendBotMessage(src, commandData+" is not a valid tier!",tourschan, false)

                    }

                    else {

                        sendBotMessage(src, "No data exists yet!",tourschan, false)

                    }

                }

                return true;

            }

            if (command == "fullmonthlyleaderboard") {

                try {

                    var now = new Date()

                    var themonths = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "decemeber"]

                    if (commandData == "") {

                        var monthlyfile = "tourmonthscore_"+themonths[now.getUTCMonth()]+"_"+now.getUTCFullYear()+".txt"

                    }

                    else {

                        var monthdata = commandData.toLowerCase().split(" ",2)

                        if (monthdata.length == 1) {

                            monthdata.push(now.getUTCFullYear());

                        }

                        var monthlyfile = "tourmonthscore_"+monthdata[0]+"_"+monthdata[1]+".txt"

                    }

                    var rankings = sys.getFileContent(monthlyfile).split("\n")

                    var list = [];

                    for (var p in rankings) {

                        if (rankings[p] == "") continue;

                        var rankingdata = rankings[p].split(":::",2)

                        if (rankingdata[1] < 1) continue;

                        list.push([rankingdata[1], rankingdata[0]]);

                    }

                    list.sort(function(a,b) { return b[0] - a[0] ; });

                    sys.sendMessage(src, "*** FULL MONTHLY TOURNAMENT RANKINGS "+(commandData != "" ? "("+commandData+") " : "")+"***",tourschan)

                    for (var x=0; x<65536; x++) {

                        if (x >= list.length) break;

                        if (rankkey[1] === parseInt((list[x])[0])) {

                            sys.sendMessage(src, "#"+rankkey[0]+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                        }

                        else {

                            sys.sendMessage(src, "#"+(x+1)+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                            rankkey = [x+1, parseInt((list[x])[0])]

                        }

                    }

                }

                catch (err) {

                    sendBotMessage(src, "No data exists yet for the month "+commandData+"!",tourschan, false)

                }

                return true;

            }

        }

        if (isTourSuperAdmin(src)) {

            /* Tournament Admins etc. */

            if (command == "touradmin") {

                var tadmins = tours.touradmins

                if (sys.dbIp(commandData) === undefined) {

                    sendBotMessage(src,"This user doesn't exist!",tourschan,false)

                    return true;

                }

                if (!sys.dbRegistered(commandData)) {

                    sendBotMessage(src,"They aren't registered so you can't give them authority!",tourschan,false)

                    if (sys.id(commandData) !== undefined) {

                        sendBotMessage(sys.id(commandData), "Please register ASAP, before getting tour authority.","all",false)

                    }

                    return true;

                }

                if (sys.dbAuth(commandData) >= 1) {

                    sendBotMessage(src,"They can already start tours!",tourschan,false)

                    return true;

                }

                if (tadmins !== undefined) {

                    for (var t in tadmins) {

                        if (tadmins[t].toLowerCase() == commandData.toLowerCase()) {

                            sendBotMessage(src,"They are already a tour admin!",tourschan,false)

                            return true;

                        }

                    }

                }

                tadmins.push(commandData)

                tours.touradmins = tadmins

                saveTourKeys()

                sendBotAll(sys.name(src)+" promoted "+commandData.toLowerCase()+" to a tournament admin!",tourschan,false)

                return true;

            }

            if (command == "tourdeadmin") {

                var tadmins = tours.touradmins

                if (sys.dbIp(commandData) === undefined) {

                    sendBotMessage(src,"This user doesn't exist!",tourschan,false)

                    return true;

                }

                var index = -1

                if (tadmins !== undefined) {

                    for (var t=0;t<tadmins.length;t++) {

                        if (cmp(tadmins[t],commandData.toLowerCase())) {

                            index = t;

                            break;

                        }

                    }

                }

                if (index == -1) {

                    sendBotMessage(src,"They are not a tour admin!",tourschan,false)

                    return true;

                }

                tadmins.splice(index,1)

                tours.touradmins = tadmins

                saveTourKeys()

                sendBotAll(sys.name(src)+" fired "+commandData.toLowerCase()+" from running tournaments!",tourschan,false)

                return true;

            }

            // active history command

            if (command == "tahistory") {

                sys.sendMessage(src, "*** TOUR ADMIN HISTORY ***",tourschan)

                var length = 168;

                if (commandData == "") {

                    length = tours.activehistory.length

                }

                else if (parseInt(commandData)*24 < tours.activehistory.length) {

                    length = parseInt(commandData)*24

                }

                else {

                    length = tours.activehistory.length

                }

                for (var x=0;x<length;x++) {

                    sys.sendMessage(src, tours.activehistory[x],tourschan)

                }

                return true;

            }

            if (command == "stopautostart") {

                tours.globaltime = 0

                sendBotAll(sys.name(src)+" stopped tournaments from auto starting for now, this will be removed when another tour is started.",tourschan,false)

                return true;

            }

            /*if (command == "forcestart") {

                var key = null;

                for (var x in tours.tour) {

                    if (tours.tour[x].state == "signups") {

                        key = x;

                    }

                }

                if (key === null) {

                    sendBotMessage(src, "There are no tournaments currently in signups to force start! Use /tour [tier] instead, or /start to start the next tournament in the queue!", tourschan, false)

                    return true;

                }

                if (tours.tour[x].players.length < 3) {

                    sendBotMessage(src, "There are not enough players to start!", tourschan, false)

                    return true;

                }

                tourinitiate(key);

                sendBotAll("The "+tours.tour[x].tourtype+" tour was force started by "+sys.name(src)+".", tourschan, false)

                return true;

            }*/

            if (command == "push") {

                var key = null

                var target = commandData.toLowerCase()

                for (var x in tours.tour) {

                    if (tours.tour[x].state == "signups") {

                        key = x;

                        break;

                    }

                }

                if (key === null) {

                    sendBotMessage(src,"You can't push anyone into a tournament now!",tourschan,false)

                    return true;

                }

                /* Is already in another tour */

                if (isInTour(target) !== false) {

                    sendBotMessage(src,"You can't push them in another tour!",tourschan,false)

                    return true;

                }

                tours.tour[key].players.push(target)

                tours.tour[key].cpt += 1

                if (tours.tour[key].maxcpt !== undefined) {

                    if (tours.tour[key].cpt > tours.tour[key].maxcpt) {

                        tours.tour[key].maxcpt = tours.tour[key].cpt

                        if (tours.tour[key].maxcpt == 5) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/6)

                        }

                        else if (tours.tour[key].maxcpt == 9) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/4)

                        }

                        else if (tours.tour[key].maxcpt == 17) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/3)

                        }

                        else if (tours.tour[key].maxcpt == 33) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/2)

                        }

                        else if (tours.tour[key].maxcpt == 65) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/1.5)

                        }

                        else if (tours.tour[key].maxcpt == 129) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup)

                        }

                    }

                }

                // 256 players for technical reasons

                if (tours.tour[key].players.length >= 256) {

                    tours.tour[key].time = parseInt(sys.time())

                }

                sendBotAll(toCorrectCase(target)+" was added to the "+getFullTourName(key)+" tournament by "+sys.name(src)+" (player #"+tours.tour[key].players.length+"), "+(tours.tour[key].time - parseInt(sys.time()))+" second"+(tours.tour[key].time - parseInt(sys.time()) == 1 ? "" : "s")+" remaining!", tourschan, false)

                return true;

            }

            // enabled for now!

            if (command == "updatewinmessages") {

                var url = "https://raw.github.com/lamperi/po-server-goodies/master/tourwinverbs.txt"

                if (commandData.indexOf("http://") === 0 || commandData.indexOf("https://") === 0) {

                    url = commandData;

                }

                sendBotMessage(src, "Fetching win messages from "+url, tourschan, false);

                sys.webCall(url, function(resp) {

                    if (resp !== "") {

                        sys.writeToFile('tourwinverbs.txt', resp);

                        getTourWinMessages()

                        sendBotAll('Updated win messages!', tourschan, false);

                    } else {

                        sendBotMessage(src, 'Failed to update!', tourschan, false);

                    }

                });

                return true;

            }

            if (command == "start") {

                for (var x in tours.tour) {

                    if (tours.tour[x].state == "signups") {

                        sendBotMessage(src, "A tournament is already in signups!", tourschan, false)

                        return true;

                    }

                }

                if (tours.queue.length != 0) {

                    var data = tours.queue[0].split(":::",5)

                    var tourtostart = data[0]

                    var parameters = {"mode": data[2], "gen": data[3], "type": data[4]}

                    tours.queue.splice(0,1)

                    tourstart(tourtostart, sys.name(src), tours.key, parameters)

                    sendBotAll(sys.name(src)+" force started the "+tourtostart+" tournament!",tourschan,false)

                    return true;

                }

                else {

                    sendBotMessage(src, "There are no tournaments to force start! Use /tour [tier] instead!", tourschan, false)

                    return true;

                }

            }

            if (command == "tourbans") {

                sys.sendMessage(src, "Active tourbans: "+tours.tourbans.join(", "),tourschan)

                return true;

            }

            if (command == "tourban") {

                var tar = commandData.toLowerCase();

                if (sys.dbIp(tar) === undefined) {

                    sendBotMessage(src, "No such user",tourschan,false)

                    return true;

                }

                if (sys.dbAuth(tar) >= sys.auth(src) || isTourSuperAdmin(sys.id(tar))) {

                    sendBotMessage(src, "Can't ban higher auth",tourschan,false)

                    return true;

                }

                var index = tours.tourbans.indexOf(tar)

                if (index != -1) {

                    sendBotMessage(src, "They are already tourbanned!",tourschan,false)

                    return true;

                }

                sendBotAll(sys.name(src)+" unleashed their wrath on "+toCorrectCase(tar)+"!",tourschan,false)

                if (sys.id(tar) !== undefined) {

                    if (sys.isInChannel(sys.id(tar), tourschan)) {

                        sys.kick(sys.id(tar), tourschan)

                    }

                }

                var key = isInTour(tar);

                if (key !== false) {

                    if (tours.tour[key].state == "signups") {

                        var index = tours.tour[key].players.indexOf(tar.toLowerCase())

                        tours.tour[key].players.splice(index, 1)

                        tours.tour[key].cpt -= 1

                        sendBotAll(toCorrectCase(tar)+" was taken out of the tournament signups by "+sys.name(src)+" from the "+getFullTourName(key)+" tournament!", tourschan, false);

                    }

                    else {

                        disqualify(tar.toLowerCase(), key, false)

                    }

                }

                sendBotAll("And "+toCorrectCase(tar)+" was gone!",tourschan,false)

                tours.tourbans.push(tar)

                return true;

            }

            if (command == "tourunban") {

                var tar = commandData.toLowerCase();

                if (sys.dbIp(tar) === undefined) {

                    sendBotMessage(src, "No such user",tourschan,false)

                    return true;

                }

                var index = tours.tourbans.indexOf(tar)

                if (index == -1) {

                    sendBotMessage(src, "They aren't tourbanned!",tourschan,false)

                    return true;

                }

                tours.tourbans.splice(index,1)

                sendBotMessage(src, "You unbanned "+toCorrectCase(tar)+" from tournaments!",tourschan,false)

                return true;

            }

        }

        if (isTourAdmin(src)) {

            if (command == "tour" || (command == "tourstart" && isTourSuperAdmin(src))) {

                var data = commandData.split(":",2)

                var thetier = data[0].toLowerCase()

                var tiers = sys.getTierList()

                var found = false;

                for (var x in tiers) {

                    if (tiers[x].toLowerCase() == thetier) {

                        var tourtier = tiers[x];

                        found = true;

                        break;

                    }

                }

                if (!found) {

                    sendBotMessage(src, "The tier '"+commandData+"' doesn't exist! Make sure the tier is typed out correctly and that it exists.", tourschan, false)

                    return true;

                }

                if (tourtier.indexOf("Smogon") != -1 && !isTourSuperAdmin(src)) {

                    sendBotMessage(src, "You are not permitted to run Smogon tier tournaments!", tourschan, false)

                    return true;

                }

                var lasttours = getListOfTours(7);

                var lastindex = lasttours.indexOf(tourtier);

                if (lastindex != -1 && !isTourSuperAdmin(src)) {

                    sendBotMessage(src, "A "+tourtier+" tournament is in the queue, is running or was recently run, no repeating!", tourschan, false)

                    return true;

                }

                var isSignups = false;

                for (var x in tours.tour) {

                    if (tours.tour[x].state == "signups") {

                        isSignups = true;

                    }

                }

                var detiers = ["CC 1v1", "Wifi CC 1v1", "Gen 5 1v1", "Gen 5 1v1 Ubers"];

                var allgentiers = ["Challenge Cup", "Metronome", "CC 1v1", "Wifi CC 1v1"];

                var parameters = {"gen": "default", "mode": modeOfTier(tourtier), "type": detiers.indexOf(tourtier) == -1 ? "single" : "double"};

                if (data.length > 1) {

                    var parameterdata = data[1].split(" ");

                    for (var p in parameterdata) {

                        var parameterinfo = parameterdata[p].split("=",2);

                        var parameterset = parameterinfo[0]

                        var parametervalue = parameterinfo[1]

                        if (cmp(parameterset, "mode")) {

                            var singlesonlytiers = ["DW 1v1", "DW 1v1 Ubers", "CC 1v1", "Wifi CC 1v1", "GBU Singles", "Adv Ubers", "Adv OU", "DP Ubers", "DP OU", "DW OU", "DW Ubers", "Wifi OU", "Wifi Ubers"];

                            if ((modeOfTier(tourtier) == "Doubles" || modeOfTier(tourtier) == "Triples" || singlesonlytiers.indexOf(tourtier) != -1) && !cmp(parametervalue, modeOfTier(tourtier))) {

                                sendBotMessage(src, "The "+tourtier+" tier can only be played in " + modeOfTier(tourtier) + " mode!", tourschan, false);

                                return true;

                            }

                            if (cmp(parametervalue, "singles")) {

                                parameters.mode = "Singles";

                            }

                            else if (cmp(parametervalue, "doubles")) {

                                parameters.mode = "Doubles";

                            }

                            else if (cmp(parametervalue, "triples")) {

                                parameters.mode = "Triples";

                            }

                        }

                        else if (cmp(parameterset, "gen") && allgentiers.indexOf(tourtier) != -1) { // only allgentours can change gen

                            var newgen = getSubgen(parametervalue, false)

                            if (newgen !== false) {

                                parameters.gen = newgen

                            }

                            else {

                                parameters.gen = "5-1" // BW2

                                sendBotMessage(src, "Warning! The subgen '"+parametervalue+"' does not exist! Used BW2 instead!", tourschan, false);

                            }

                        }

                        else if (cmp(parameterset, "type")) {

                            if (cmp(parametervalue, "double")) {

                                parameters.type = "double";

                            }

                            else if (cmp(parametervalue, "single")) {

                                parameters.type = "single";

                            }

                        }

                        else {

                            sendBotMessage(src, "Warning! The parameter '"+parameterset+"' does not exist!", tourschan, false);

                        }

                    }

                }

                if (allgentiers.indexOf(tourtier) != -1 && parameters.gen === "default") {

                    parameters.gen = "5-1";

                }

                if (tours.queue.length >= Config.Tours.maxqueue && !isTourSuperAdmin(src) && command == "tour") {

                    sendBotMessage(src, "There are already "+Config.Tours.maxqueue+" or more tournaments in the queue, so you can't add another one!", tourschan, false)

                    return true;

                }

                else if (isSignups || ((tours.keys.length > 0 || tours.queue.length > 0) && command == "tour")) {

                    tours.queue.push(tourtier+":::"+sys.name(src)+":::"+parameters.mode+":::"+parameters.gen+":::"+parameters.type)

                    sendBotAll(sys.name(src)+" added a "+tourtier+" tournament into the queue! Type /queue to see what is coming up next.",tourschan, false)

                }

                else {

                    tourstart(tourtier, sys.name(src), tours.key, parameters)

                    if (command == "tourstart") {

                        sendBotAll(sys.name(src)+" force started this tournament!", tourschan, false)

                    }

                }

                addTourActivity(src)

                return true;

            }

            if (command == "remove") {

                var index = -1

                if (parseInt(commandData) !== "") {

                    index = parseInt(commandData)-1

                }

                for (var a = tours.queue.length-1; a>=0; a -= 1) {

                    var tourtoremove = (tours.queue[a].split(":::",1))[0].toLowerCase()

                    if (commandData.toLowerCase() == tourtoremove) {

                        index = a;

                        break;

                    }

                }

                if (index < 0 || index >= tours.queue.length) {

                    sendBotMessage(src, "The tier '"+commandData+"' doesn't exist in the queue, so it can't be removed! Make sure the tier is typed out correctly.", tourschan, false)

                    return true;

                }

                else {

                    var removedtour = (tours.queue[index].split(":::",1))[0]

                    tours.queue.splice(index, 1)

                    sendBotAll("The "+removedtour+" tour (position "+(index+1)+") was removed from the queue by "+sys.name(src)+".", tourschan, false)

                    return true;

                }

            }

            if (command == "endtour") {

                var tier = commandData

                var key = null

                for (var x in tours.tour) {

                    if (tours.tour[x].tourtype.toLowerCase() == commandData.toLowerCase()) {

                        key = x;

                        break;

                    }

                }

                if (key === null) {

                    sendBotMessage(src,"The "+commandData+" tournament is not in progress!",tourschan,false)

                    return true;

                }

                sendBotAll("The "+getFullTourName(key)+" tournament was cancelled by "+sys.name(src)+"!", tourschan,false)

                delete tours.tour[key];

                tours.keys.splice(tours.keys.indexOf(key), 1);

                return true;

            }

            if (command == "passta") {

                var newname = commandData

                var tadmins = tours.touradmins

                if (sys.dbIp(newname) === undefined) {

                   sendBotMessage(src,"This user doesn't exist!",tourschan,false)

                    return true;

                }

                if (!sys.dbRegistered(newname)) {

                    sendBotMessage(src,"That account isn't registered so you can't give it authority!",tourschan,false)

                    return true;

                }

                if (sys.dbAuth(newname) >= 1) {

                    sendBotMessage(src,"That account can already start tours!",tourschan,false)

                    return true;

                }

                if (tadmins !== undefined) {

                    for (var t in tadmins) {

                        if (cmp(tadmins[t].toLowerCase(), newname)) {

                            sendBotMessage(src,"The target is already a tour admin!",tourschan,false)

                            return true;

                        }

                    }

                }

                if (sys.id(newname) === undefined) {

                    sendBotMessage(src,"The target is offline!",tourschan,false)

                    return true;

                }

                if (sys.ip(sys.id(newname)) !== sys.ip(src)) {

                    sendBotMessage(src,"Both accounts must be on the same IP to switch!",tourschan,false)

                    return true;

                }

                var index = -1;

                for (var t=0;t<tadmins.length;t++) {

                    if (cmp(tadmins[t],sys.name(src))) {

                        index = t;

                        break;

                    }

                }

                if (index == -1) {

                    sendBotMessage(src,"Failed to pass tour auth! Please post about this issue on forums!",tourschan,false)

                    return true;

                }

                tadmins.splice(t, 1, toCorrectCase(newname))

                tours.touradmins = tadmins

                saveTourKeys()

                sendBotAll(sys.name(src)+" passed their tour auth to "+toCorrectCase(newname)+"!",tourschan,false)

                sendBotAll(sys.name(src)+" passed their tour auth to "+toCorrectCase(newname)+"!",sys.channelId("Victory Road"),false)

                sendBotAll(sys.name(src)+" passed their tour auth to "+toCorrectCase(newname)+"!",sys.channelId("Indigo Plateau"),false)

                return true;

            }

            if (command == "dq") {

                var key = isInTour(commandData)

                if (key === false) {

                    sendBotMessage(src,"That player isn't in a tournament!",tourschan,false)

                    return true;

                }

                if (tours.tour[key].state == "signups") {

                    var index = tours.tour[key].players.indexOf(commandData.toLowerCase())

                    tours.tour[key].players.splice(index, 1)

                    tours.tour[key].cpt -= 1

                    sendBotAll(toCorrectCase(commandData)+" was taken out of the tournament signups by "+sys.name(src)+" from the "+getFullTourName(key)+" tournament!", tourschan);

                }

                else {

                    sendBotAll(sys.name(src)+" disqualified "+toCorrectCase(commandData)+" from the "+getFullTourName(key)+" tournament!", tourschan, false)

                    disqualify(commandData.toLowerCase(), key, false)

                }

                addTourActivity(src)

                return true;

            }

            if (command == "cancelbattle") {

                var key = isInTour(name)

                if (key === false) {

                    sendBotMessage(src,"That player isn't in a tournament!",tourschan,false)

                    return true;

                }

                var index = tours.tour[key].battlers.indexOf(commandData.toLowerCase())

                if (index == -1) {

                    sendBotMessage(src,"That player isn't battling for the tournament!",tourschan,false)

                    return true;

                }

                else {

                    var opponent = index%2 === 0 ? tours.tour[key].battlers[index+1] : tours.tour[key].battlers[index-1]

                    sendBotAll(sys.name(src)+" voided the results of the battle between "+toCorrectCase(commandData)+" and "+toCorrectCase(opponent)+" in the "+getFullTourName(key)+" tournament, please rematch.", tourschan, false)

                    tours.tour[key].battlers.splice(index,1)

                    tours.tour[key].battlers.splice(tours.tour[key].battlers.indexOf(opponent),1)

                }

                addTourActivity(src)

                return true;

            }

            if (command == "sub") {

                var data = commandData.split(":",2)

                var newname = data[0].toLowerCase()

                var oldname = data[1].toLowerCase()

                var key = isInTour(oldname)

                if (sys.id(newname) === undefined) {

                    sendBotMessage(src,"It's not a good idea to sub a player in who isn't on the server at the moment!",tourschan,false)

                    return true;

                }

                if (key === false) {

                    sendBotMessage(src,"Your target doesn't exist in a tournament!",tourschan,false)

                    return true;

                }

                if (isInTour(newname) !== false) {

                    sendBotMessage(src,"Your target is already in a tournament!",tourschan,false)

                    return true;

                }

                tours.tour[key].players.splice(tours.tour[key].players.indexOf(oldname),1,newname)

                sendBotAll(sys.name(src)+" substituted "+toCorrectCase(newname)+" in place of "+toCorrectCase(oldname)+" in the "+getFullTourName(key)+" tournament.", tourschan, false)

                addTourActivity(src)

                return true;

            }

            if (command == "tourmute") {

                var data = commandData.split(":", 3);

                var tar = data[0];

                var reason = data[1];

                var time = 900;

                if (data.length > 2) {

                    var time = converttoseconds(data[2]);

                }

                var ip = sys.dbIp(tar)

                if (sys.id(tar) !== undefined) {

                    if (isTourAdmin(sys.id(tar)) && sys.maxAuth(ip) >= sys.auth(src)) {

                        sendBotMessage(src,"Can't mute higher auth!",tourschan, false)

                        return true;

                    }

                }

                else {

                    if ((tours.touradmins.indexOf(tar.toLowerCase()) > -1 || sys.maxAuth(ip) >= 1) && sys.maxAuth(ip) >= sys.auth(src)) {

                        sendBotMessage(src,"Can't mute higher auth!",tourschan, false)

                        return true;

                    }

                }

                if (ip === undefined) {

                    sendBotMessage(src,"This person doesn't exist!",tourschan,false)

                    return true;

                }

                if (tours.tourmutes.hasOwnProperty(ip)) {

                    sendBotMessage(src,"They are already tourmuted!",tourschan,false)

                    return true;

                }

                if (reason === undefined) {

                    reason = "";

                }

                if (reason === "" && !isTourOwner(src)) {

                    sendBotMessage(src,"You must provide a reason!",tourschan, false)

                    return true;

                }

                if (time <= 0) {

                    sendBotMessage(src,"Can't tourmute someone for less than 1 second!",tourschan, false)

                    return true;

                }

                if (usingBadWords(reason)) {

                    sendBotMessage(src,"'"+reason+"' is not a valid reason!",tourschan,false)

                    return true;

                }

                var maxtime = 0;

                if (isTourOwner(src)) {

                    maxtime = Number.POSITIVE_INFINITY

                }

                else if (isTourSuperAdmin(src)) {

                    maxtime = 2592000

                }

                else if (sys.auth(src) >= 1) {

                    maxtime = 86400

                }

                else {

                    maxtime = 3600

                }

                if (isNaN(time)) {

                    time = 900;

                }

                if (time > maxtime) {

                    time = maxtime;

                }

                var channels = [sys.channelId("Indigo Plateau"), sys.channelId("Victory Road"), tourschan]

                tours.tourmutes[ip] = {'expiry': parseInt(sys.time()) + time, 'reason': reason, 'auth': sys.name(src), 'name': tar.toLowerCase()}

                var key = isInTour(tar);

                if (key !== false) {

                    if (tours.tour[key].state == "signups") {

                        var index = tours.tour[key].players.indexOf(tar.toLowerCase())

                        tours.tour[key].players.splice(index, 1)

                        tours.tour[key].cpt -= 1

                        sendBotAll(toCorrectCase(tar)+" was taken out of the tournament signups by "+sys.name(src)+" from the "+getFullTourName(key)+" tournament!", tourschan, false);

                    }

                    else {

                        disqualify(tar.toLowerCase(), key, false)

                    }

                }

                for (var x in channels) {

                    if (sys.existChannel(sys.channel(channels[x]))) {

                        sendBotAll(tar+" was tourmuted by "+sys.name(src)+" for "+time_handle(time)+"! "+(reason !== "" ? "[Reason: "+reason+"]" : ""), channels[x], false)

                    }

                }

                saveTourMutes()

                return true;

            }

            if (command == "tourunmute") {

                var ip = sys.dbIp(commandData)

                if (ip === undefined) {

                    sendBotMessage(src,"This person doesn't exist!",tourschan,false)

                    return true;

                }

                if (!tours.tourmutes.hasOwnProperty(ip)) {

                    sendBotMessage(src,"They aren't tourmuted!",tourschan,false)

                    return true;

                }

                if (ip === sys.ip(src) && !isTourOwner(src)) {

                    sendBotMessage(src,"You can't unmute yourself!",tourschan,false)

                    return true;

                }

                delete tours.tourmutes[ip];

                sendBotAll(commandData+" was untourmuted by "+sys.name(src)+"!", tourschan, false)

                saveTourMutes()

                return true;

            }

            if (command == "tourmutes") {

                sys.sendMessage(src,"*** TOURS MUTELIST ***",tourschan)

                for (var t in tours.tourmutes) {

                    if (tours.tourmutes[t].expiry > parseInt(sys.time())) {

                        sys.sendMessage(src, tours.tourmutes[t].name + ": Set by "+tours.tourmutes[t].auth+"; expires in "+time_handle(tours.tourmutes[t].expiry-parseInt(sys.time()))+"; reason: "+tours.tourmutes[t].reason, tourschan)

                    }

                }

                return true;

            }

            if (command == "config") {

                sys.sendMessage(src,"*** CURRENT CONFIGURATION ***",tourschan)

                sys.sendMessage(src,"Maximum Queue Length: "+Config.Tours.maxqueue,tourschan)

                sys.sendMessage(src,"Maximum Number of Simultaneous Tours: "+Config.Tours.maxrunning,tourschan)

                sys.sendMessage(src,"Tour Sign Ups Length: "+time_handle(Config.Tours.toursignup),tourschan)

                sys.sendMessage(src,"Tour Auto DQ length: "+time_handle(Config.Tours.tourdq),tourschan)

                sys.sendMessage(src,"Tour Activity Check: "+time_handle(Config.Tours.activity),tourschan)

                sys.sendMessage(src,"Substitute Time: "+time_handle(Config.Tours.subtime),tourschan)

                sys.sendMessage(src,"Tour Break Time: "+time_handle(Config.Tours.tourbreak),tourschan)

                sys.sendMessage(src,"Absolute Tour Break Time: "+time_handle(Config.Tours.abstourbreak),tourschan)

                sys.sendMessage(src,"Tour Reminder Time: "+time_handle(Config.Tours.reminder),tourschan)

                sys.sendMessage(src,"Auto start when percentage of players is less than: "+Config.Tours.minpercent+"%",tourschan)

                sys.sendMessage(src,"Bot Name: "+Config.Tours.tourbot,tourschan)

                sys.sendMessage(src,"Colour: "+Config.Tours.tourbotcolour,tourschan)

                sys.sendMessage(src,"Channel: "+Config.Tours.channel,tourschan)

                sys.sendMessage(src,"Error Channel: "+Config.Tours.errchannel,tourschan)

                sys.sendMessage(src,"Scoring system activated: "+Config.Tours.points,tourschan)

                sys.sendMessage(src,"Debug: "+Config.Tours.debug,tourschan)

                return true;

            }

            if (command == "configset") {

                var pos = commandData.indexOf(":")

                if (pos == -1) {

                    sys.sendMessage(src,"*** CONFIG SETTINGS ***",tourschan);

                    sys.sendMessage(src,"Usage: /configset [var]:[value]. Variable list and current values are below:",tourschan);

                    sys.sendMessage(src,"Example: '/configset maxqueue:3' will set the maximum queue length to 3:",tourschan);

                    sys.sendMessage(src,"maxqueue: "+Config.Tours.maxqueue,tourschan);

                    sys.sendMessage(src,"maxrunning: "+Config.Tours.maxrunning,tourschan);

                    sys.sendMessage(src,"toursignup: "+time_handle(Config.Tours.toursignup),tourschan);

                    sys.sendMessage(src,"tourdq: "+time_handle(Config.Tours.tourdq),tourschan);

                    sys.sendMessage(src,"touractivity: "+time_handle(Config.Tours.activity),tourschan);

                    sys.sendMessage(src,"subtime: "+time_handle(Config.Tours.subtime),tourschan);

                    sys.sendMessage(src,"breaktime: "+time_handle(Config.Tours.tourbreak),tourschan);

                    sys.sendMessage(src,"absbreaktime: "+time_handle(Config.Tours.abstourbreak),tourschan);

                    sys.sendMessage(src,"remindertime: "+time_handle(Config.Tours.reminder),tourschan);

                    sys.sendMessage(src,"minpercent: "+Config.Tours.minpercent,tourschan);

                    sys.sendMessage(src,"botname: "+Config.Tours.tourbot,tourschan);

                    sys.sendMessage(src,"colour: "+Config.Tours.tourbotcolour,tourschan);

                    sys.sendMessage(src,"channel: "+Config.Tours.channel,tourschan);

                    sys.sendMessage(src,"scoring: "+Config.Tours.points,tourschan);

                    sys.sendMessage(src,"debug: "+Config.Tours.debug+" (to change this, type /configset debug [0/1] ~ true = 1; false = 0)",tourschan);

                    return true;

                }

                var option = commandData.substr(0,pos).toLowerCase()

                if (["botname", "bot name", "channel", "errchannel", "color", "colour"].indexOf(option) == -1) {

                    var value = parseInt(commandData.substr(pos+1))

                }

                else {

                    var value = commandData.substr(pos+1)

                }

                if (option == 'maxqueue' || option == "maximum queue length") {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value between 1 and 255 that determines the maximum queue length. Admins and owners can bypass this restriction.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.maxqueue,tourschan,false);

                        return true;

                    }

                    else if (value < 1 || value > 255) {

                        sendBotMessage(src,"Value must be between 1 and 255.",tourschan,false);

                        return true;

                    }

                    Config.Tours.maxqueue = value

                    sys.saveVal("tourconfig.txt", "maxqueue", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the maximum queue length to "+Config.Tours.maxqueue)

                    return true;

                }

                else if (option == 'maxrunning' || option == 'maximum number of simultaneous tours') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value between 1 and 255 that determines the maximum rumber of simultaneous tours.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.maxrunning,tourschan,false);

                        return true;

                    }

                    else if (value < 1 || value > 255) {

                        sendBotMessage(src,"Value must be between 1 and 255.",tourschan,false);

                        return true;

                    }

                    Config.Tours.maxrunning = value

                    sys.saveVal("tourconfig.txt", "maxrunning", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the maximum number of simultaneous tours to "+Config.Tours.maxrunning)

                    return true;

                }

                else if (option == 'toursignup' || option == 'tour sign ups length') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) between 10 and 600 that determines the intial signup length.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.toursignup,tourschan,false);

                        return true;

                    }

                    else if (value < 10 || value > 600) {

                        sendBotMessage(src,"Value must be between 10 and 600.",tourschan,false);

                        return true;

                    }

                    Config.Tours.toursignup = value

                    sys.saveVal("tourconfig.txt", "toursignup", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the sign up time to "+time_handle(Config.Tours.toursignup))

                    return true;

                }

                else if (option == 'tourdq' || option == 'tour auto dq length') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) between 30 and 300 that determines how long it is before inactive users are disqualified.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.tourdq,tourschan,false);

                        return true;

                    }

                    else if (value < 30 || value > 300) {

                        sendBotMessage(src,"Value must be between 30 and 300.",tourschan,false);

                        return true;

                    }

                    Config.Tours.tourdq = value

                    sys.saveVal("tourconfig.txt", "tourdq", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the disqualification time to "+time_handle(Config.Tours.tourdq))

                    return true;

                }

                else if (option == 'touractivity' || option == 'tour activity check') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) between 60 and 300 that determines how long it is from a user's last message before a user is considered inactive.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.activity,tourschan,false);

                        return true;

                    }

                    else if (value < 60 || value > 300) {

                        sendBotMessage(src,"Value must be between 60 and 300.",tourschan,false);

                        return true;

                    }

                    Config.Tours.activity = value

                    sys.saveVal("tourconfig.txt", "touractivity", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the activity time to "+time_handle(Config.Tours.activity))

                    return true;

                }

                else if (option == 'subtime' || option == 'substitute time') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) between 30 and 300 that determines how long it is before subs are disqualified.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.subtime,tourschan,false);

                        return true;

                    }

                    else if (value < 30 || value > 300) {

                        sendBotMessage(src,"Value must be between 30 and 300.",tourschan,false);

                        return true;

                    }

                    Config.Tours.subtime = value

                    sys.saveVal("tourconfig.txt", "subtime", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the sub time to "+time_handle(Config.Tours.subtime))

                    return true;

                }

                else if (option == 'breaktime' || option == 'tour break time') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) between 30 and 300 that determines how long it is before another tournament is started if one gets cancelled.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.breaktime,tourschan,false);

                        return true;

                    }

                    else if (value < 30 || value > 300) {

                        sendBotMessage(src,"Value must be between 30 and 300.",tourschan,false);

                        return true;

                    }

                    Config.Tours.tourbreak = value

                    sys.saveVal("tourconfig.txt", "breaktime", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the break time (betweeen cancelled tournaments) to "+time_handle(Config.Tours.tourbreak))

                    return true;

                }

                else if (option == 'absbreaktime' || option == 'absolute tour break time') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) between 300 and 1800 that influences how long it is between tournaments starting. The actual time will depend on other factors.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.absbreaktime,tourschan,false);

                        return true;

                    }

                    else if (value < 300 || value > 1800) {

                        sendBotMessage(src,"Value must be between 300 and 1800.",tourschan,false);

                        return true;

                    }

                    Config.Tours.abstourbreak = value

                    sys.saveVal("tourconfig.txt", "absbreaktime", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the absolute break time (base time between starting tours) to "+time_handle(Config.Tours.abstourbreak))

                    return true;

                }

                else if (option == 'remindertime' || option == 'tour reminder time') {

                    if (isNaN(value)) {

                        sendBotMessage(src,"A value (in seconds) that determines how long it is before a battle reminder is sent to players from the start of the round",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.reminder,tourschan,false);

                        return true;

                    }

                    else if (value < 15 || value > (Config.Tours.tourdq-30)) {

                        sendBotMessage(src,"Value must be between 15 and "+(Config.Tours.tourdq-30)+".",tourschan,false);

                        return true;

                    }

                    Config.Tours.reminder = value

                    sys.saveVal("tourconfig.txt", "remindertime", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the reminder time to "+time_handle(Config.Tours.reminder))

                    return true;

                }

                else if (option == 'minpercent') {

                    if (!isTourSuperAdmin(src)) {

                        sendBotMessage(src,"Can't change this config setting, ask an admin for this.",tourschan,false);

                        return true;

                    }

                    if (isNaN(value)) {

                        sendBotMessage(src,"When the percentage of players drops below this value, a new tournament will start if possible. Overides maximum number of simultaneous tours.",tourschan,false);

                        sendBotMessage(src,"Current Value: "+Config.Tours.minpercent+"%",tourschan,false);

                        return true;

                    }

                    else if (value < 1 || value > 30) {

                        sendBotMessage(src,"Value must be between 1 and 30.",tourschan,false);

                        return true;

                    }

                    Config.Tours.minpercent = value

                    sys.saveVal("tourconfig.txt", "minpercent", value)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the auto start percentage to "+Config.Tours.minpercent+"%")

                    return true;

                }

                else if (option == 'color' || option == 'colour') {

                    if (!isTourSuperAdmin(src)) {

                        sendBotMessage(src,"Can't change the bot colour, ask an admin for this.",tourschan,false);

                        return true;

                    }

                    else if (value.length !== 6) {

                        sendBotMessage(src,"String must be 6 hexnumbers long",tourschan,false);

                        return true;

                    }

                    for (var x=0;x<6;x++) {

                        var allowedchars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]

                        if (allowedchars.indexOf(value.charAt(x)) == -1) {

                            sendBotMessage(src,"There was an error with the colour code you tried to put in.",tourschan,false);

                            return true;

                        }

                    }

                    Config.Tours.tourbotcolour = "#"+value

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the tourbot colour to "+Config.Tours.tourbotcolour,tourschan,false);

                    return true;

                }

                else if (option == 'botname' || option == 'bot name') {

                    if (!isTourOwner(src)) {

                        sendBotMessage(src,"Can't change the botname, ask an owner for this.",tourschan,false);

                        return true;

                    }

                    else if (value.length === 0) {

                        sendBotMessage(src,"Botname can't be empty!",tourschan,false);

                        return true;

                    }

                    Config.Tours.tourbot = value+": "

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the tourbot name to "+Config.Tours.tourbot,tourschan,false);

                    return true;

                }

                else if (option == 'channel') {

                    if (!isTourOwner(src)) {

                        sendBotMessage(src,"Can't change the channel, ask an owner for this.",tourschan,false);

                        return true;

                    }

                    else if (!sys.existChannel(value)) {

                        sendBotMessage(src,"The channel needs to exist!",tourschan,false);

                        return true;

                    }

                    Config.Tours.channel = value

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the tournament channel to "+Config.Tours.channel,tourschan,false);

                    tourschan = sys.channelId(Config.Tours.channel)

                    sys.sendAll("Version "+Config.Tours.version+" of tournaments has been loaded successfully in this channel!", tourschan)

                    return true;

                }

                else if (option == 'scoring') {

                    if (!isTourOwner(src)) {

                        sendBotMessage(src,"Can't turn scoring on/off, ask an owner for this.",tourschan,false);

                        return true;

                    }

                    if (value !== 0 && value != 1) {

                        sendBotMessage(src,"Value must be 0 (turns debug off) or 1 (turns it on).",tourschan,false);

                        return true;

                    }

                    Config.Tours.points = (value == 1 ? true : false)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the scoring mode to "+Config.Tours.points,tourschan,false);

                    return true;

                }

                else if (option == 'debug') {

                    if (!isTourOwner(src)) {

                        sendBotMessage(src,"Can't turn debug on/off, ask an owner for this.",tourschan,false);

                        return true;

                    }

                    if (value !== 0 && value != 1) {

                        sendBotMessage(src,"Value must be 0 (turns debug off) or 1 (turns it on).",tourschan,false);

                        return true;

                    }

                    Config.Tours.debug = (value == 1 ? true : false)

                    sendAllTourAuth(Config.Tours.tourbot+sys.name(src)+" set the debug mode to "+Config.Tours.debug,tourschan,false);

                    return true;

                }

                else {

                    sendBotMessage(src,"The configuration option '"+option+"' does not exist.",tourschan,false);

                    return true;

                }

            }

        }

        // Normal User Commands

        if (command == "join") {

            if (!sys.dbRegistered(sys.name(src))) {

                sendBotMessage(src, "You need to register to play in #"+sys.channel(tourschan)+"! Click on the 'Register' button below and follow the instructions!", tourschan, false);

                return true;

            }

            if (isTourMuted(src) || isTourBanned(src)) {

                sendBotMessage(src, "You are tourmuted so you are prohibited from playing!", tourschan, false);

                return true;

            }

            var key = null

            for (var x in tours.tour) {

                if (tours.tour[x].state == "subround" || tours.tour[x].state == "signups") {

                    key = x;

                    break;

                }

            }

            if (key === null) {

                sendBotMessage(src, "No tournament has signups available at the moment!",tourschan,false)

                return true;

            }

            if (!sys.hasTier(src, tours.tour[key].tourtype)) {

                sendBotMessage(src, "You need to have a team in the "+tours.tour[key].tourtype+" tier to join!",tourschan,false)

                return true;

            }

            var isInCorrectGen = false;

            for (var x=0; x<sys.teamCount(src); x++) {

                if (sys.tier(src, x) === tours.tour[key].tourtype) {

                    if (tours.tour[key].parameters.gen != "default") {

                        var getGenParts = tours.tour[key].parameters.gen.split("-",2)

                        if (parseInt(sys.gen(src,x)) === parseInt(getGenParts[0]) && parseInt(sys.subgen(src,x)) === parseInt(getGenParts[1])) {

                            isInCorrectGen = true;

                            break;

                        }

                    }

                    else {

                        isInCorrectGen = true;

                        break;

                    }

                }

            }

            if (!isInCorrectGen) {

                sendBotMessage(src, "Your generation must be set to "+getSubgen(tours.tour[key].parameters.gen, true)+". Change it in the teambuilder.",tourschan,false)

                return true;

            }

            /* Is already in another tour */

            var isStillInTour = isInTour(sys.name(src))

            if (isStillInTour !== false) {

                if (tours.tour[isStillInTour].state == "subround" || tours.tour[isStillInTour].state == "signups") {

                    sendBotMessage(src, "You can't join twice!",tourschan,false)

                }

                else {

                    sendBotMessage(src, "You can't join two tournaments at once with the same name!",tourschan,false)

                }

                return true;

            }

            /* Multiple account check */

            for (var a=0; a<tours.tour[key].players.length; a++) {

                var joinedip = sys.dbIp(tours.tour[key].players[a])

                if (sys.ip(src) == joinedip && ((sys.maxAuth(sys.ip(src)) < 2 && Config.Tours.debug === true) || (sys.auth(src) < 3 && Config.Tours.debug === false))) {

                    sendBotMessage(src, "You already joined the tournament under the name '"+tours.tour[key].players[a]+"'!",tourschan,false)

                    return true;

                }

            }

            if (tours.tour[key].state == "signups") {

                tours.tour[key].players.push(sys.name(src).toLowerCase())

                tours.tour[key].cpt += 1

                if (tours.tour[key].maxcpt !== undefined) {

                    if (tours.tour[key].cpt > tours.tour[key].maxcpt) {

                        tours.tour[key].maxcpt = tours.tour[key].cpt

                        if (tours.tour[key].maxcpt == 5) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/6)

                        }

                        else if (tours.tour[key].maxcpt == 9) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/4)

                        }

                        else if (tours.tour[key].maxcpt == 17) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/3)

                            sendBotAll("Over 16 players have joined the "+getFullTourName(key)+" tournament in #"+sys.channel(tourschan)+"! You still have "+time_handle(tours.tour[key].time - parseInt(sys.time()))+" to join!",0,false)

                        }

                        else if (tours.tour[key].maxcpt == 33) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/2)

                            sendBotAll("Over 32 players have joined the "+getFullTourName(key)+" tournament in #"+sys.channel(tourschan)+"! You still have "+time_handle(tours.tour[key].time - parseInt(sys.time()))+" to join!",0,false)

                        }

                        else if (tours.tour[key].maxcpt == 65) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup/1.5)

                            sendBotAll("Over 64 players have joined the "+getFullTourName(key)+" tournament in #"+sys.channel(tourschan)+"! You still have "+time_handle(tours.tour[key].time - parseInt(sys.time()))+" to join!",0,false)

                        }

                        else if (tours.tour[key].maxcpt == 129) {

                            tours.tour[key].time += Math.floor(Config.Tours.toursignup)

                            sendBotAll("Over 128 players have joined the "+getFullTourName(key)+" tournament in #"+sys.channel(tourschan)+"! You still have "+time_handle(tours.tour[key].time - parseInt(sys.time()))+" to join!",0,false)

                        }

                    }

                }

                // 256 players for technical reasons

                if (tours.tour[key].players.length >= 256) {

                    tours.tour[key].time = parseInt(sys.time())

                }

                sendBotAll("<b>"+html_escape(sys.name(src))+"</b> is player #"+tours.tour[key].players.length+" to join the "+html_escape(getFullTourName(key))+" tournament! "+(tours.tour[key].time - parseInt(sys.time()))+" second"+(tours.tour[key].time - parseInt(sys.time()) == 1 ? "" : "s")+" remaining!", tourschan, true)

                return true;

            }

            /* subbing */

            var oldname = null

            for (var n=1;n<=tours.tour[key].players.length;n++) {

                for (var k=0;k<tours.tour[key].players.length;k++) {

                    if (tours.tour[key].players[k] == "~Sub "+n+"~") {

                        oldname = "~Sub "+n+"~"

                        sendDebugMessage("Located Sub! Name: "+oldname, tourschan)

                        break;

                    }

                }

                if (oldname !== null) break;

            }



            for (var s=0;s<tours.tour[key].seeds.length;s++) {

                if (tours.tour[key].seeds[s] == sys.name(src).toLowerCase()) {

                    sendBotMessage(src, "You can't sub in to the "+getFullTourName(key)+" tournament!",tourschan, false)

                    return true;

                }

            }



            if (oldname === null) {

                sendBotMessage(src, "There are no subs remaining in the "+getFullTourName(key)+" tournament!",tourschan, false)

                return true;

            }

            var index = tours.tour[key].players.indexOf(oldname)

            var newname = sys.name(src).toLowerCase()

            tours.tour[key].players.splice(index,1,newname)

            tours.tour[key].seeds.splice(tours.tour[key].cpt,1,newname)

            tours.tour[key].cpt += 1

            sendBotAll("Late entrant "+sys.name(src)+" will play against "+(index%2 == 0 ? toCorrectCase(tours.tour[key].players[index+1]) : toCorrectCase(tours.tour[key].players[index-1]))+" in the "+getFullTourName(key)+" tournament. "+(tours.tour[key].players.length - tours.tour[key].cpt)+" sub"+(tours.tour[key].players.length - tours.tour[key].cpt == 1 ? "" : "s") + " remaining.", tourschan, false)

            return true;

        }

        if (command == "unjoin") {

            var key = null

            for (var x in tours.tour) {

                if (tours.tour[x].state == "signups") {

                    key = x;

                    break;

                }

            }

            if (key === null) {

                sendBotMessage(src, "You can't unjoin now!",tourschan,false)

                return true;

            }

            var index = tours.tour[key].players.indexOf(sys.name(src).toLowerCase())

            if (index == -1) {

                sendBotMessage(src, "You aren't in the "+getFullTourName(key)+" tournament!",tourschan,false)

                return true;

            }

            tours.tour[key].players.splice(index, 1)

            tours.tour[key].cpt -= 1

            sendBotAll(sys.name(src)+" unjoined the "+getFullTourName(key)+" tournament!", tourschan, false)

            return true;

        }

        if (command == "queue" || command == "viewqueue") {

            var queue = tours.queue

            sys.sendMessage(src, "*** Upcoming Tours ***", tourschan)

            var nextstart = time_handle(tours.globaltime - parseInt(sys.time()))

            for (var x in tours.tour) {

                if (tours.tour[x].state == "signups") {

                    nextstart = "Pending";

                    break;

                }

            }

            if (Config.Tours.maxrunning <= tours.keys.length && calcPercentage() >= Config.Tours.minpercent) {

                nextstart = "Pending";

            }

            var firsttour = true;

            for (var e in queue) {

                var queuedata = queue[e].split(":::",5)

                if (firsttour && nextstart != "Pending") {

                    sys.sendMessage(src,"1) "+queuedata[0]+": Set by "+queuedata[1]+"; Parameters: "+queuedata[2]+" Mode"+(queuedata[3] != "default" ? "; Gen: "+getSubgen(queuedata[3],true) : "")+(queuedata[4] == "double" ? "; Double Elimination" : "")+"; Starts in "+time_handle(tours.globaltime-parseInt(sys.time())),tourschan)

                    firsttour = false

                }

                else {

                    sys.sendMessage(src,(parseInt(e)+1)+") "+queuedata[0]+": Set by "+queuedata[1]+"; Parameters: "+queuedata[2]+" Mode"+(queuedata[3] != "default" ? "; Gen: "+getSubgen(queuedata[3],true) : "")+(queuedata[4] == "double" ? "; Double Elimination" : ""), tourschan)

                }

            }

            return true;

        }

        if (command == "viewround") {

            if (tours.keys.length === 0) {

                sendBotMessage(src, "No tournament is running at the moment!",tourschan, false)

                return true;

            }

            var postedrounds = false;

            var rounddata = [];

            for (var y in tours.tour) {

                var battlers = tours.tour[y].battlers

                var winners = tours.tour[y].winners

                if (tours.tour[y].round === 0) continue;

                postedrounds = true;

                var roundtable = "<div style='margin-left: 50px'><b>Round "+tours.tour[y].round+" of the "+tours.tour[y].tourtype+" Tournament</b><table><br/>"

                for (var x=0; x<tours.tour[y].players.length; x+=2) {

                    if (winners.indexOf(tours.tour[y].players[x]) != -1 && tours.tour[y].players[x] != "~Bye~") {

                        roundtable = roundtable + "<tr><td align='right'><font color=green><b>"+html_escape(toCorrectCase(tours.tour[y].players[x])) +"</b></font></td><td align='center'> won against </td><td>"+ html_escape(toCorrectCase(tours.tour[y].players[x+1]))+"</td>"

                    }

                    else if (winners.indexOf(tours.tour[y].players[x+1]) != -1 && tours.tour[y].players[x+1] != "~Bye~") {

                        roundtable = roundtable + "<tr><td align='right'><font color=green><b>"+html_escape(toCorrectCase(tours.tour[y].players[x+1])) +"</b></font></td><td align='center'> won against </td><td>"+ html_escape(toCorrectCase(tours.tour[y].players[x]))+"</td>"

                    }

                    else if (battlers.indexOf(tours.tour[y].players[x]) != -1) {

                        roundtable = roundtable + "<tr><td align='right'>"+html_escape(toCorrectCase(tours.tour[y].players[x])) +"</td><td align='center'> <a href='po:watchPlayer/"+sys.id(tours.tour[y].players[x])+"'>is battling</a> </td><td>"+ html_escape(toCorrectCase(tours.tour[y].players[x+1]))+"</td>"

                    }

                    else {

                        roundtable = roundtable + "<tr><td align='right'>"+html_escape(toCorrectCase(tours.tour[y].players[x])) +"</td><td align='center'> VS </td><td>"+ html_escape(toCorrectCase(tours.tour[y].players[x+1]))+"</td>"

                    }

                }

                rounddata.push(roundtable+"</table></div>")

            }

            if (!postedrounds) {

                sendBotMessage(src, "No tournament is running at the moment!",tourschan,false)

                return true;

            }

            else {

                var roundstosend = htmlborder+rounddata.join(htmlborder)+htmlborder

                sys.sendHtmlMessage(src, roundstosend, tourschan)

            }

            return true;

        }

        if (command == "touradmins") {

            sys.sendMessage(src, "",tourschan)

            sys.sendMessage(src, "*** TOURNAMENT ADMINS ***",tourschan)

            var tal = tours.touradmins

            var authlist = sys.dbAuths()

            for (var l in tal) {

                if (sys.id(tal[l]) !== undefined) {

                    sys.sendMessage(src, toCorrectCase(tal[l]) + " (Online):",tourschan)

                }

                else {

                    sys.sendMessage(src, tal[l],tourschan)

                }

            }

            // displays onine auth in "Tours" channel as well

            for (var m in authlist) {

                if (sys.id(authlist[m]) !== undefined && tal.indexOf(authlist[m]) == -1 && sys.isInChannel(sys.id(authlist[m]), tourschan)) {

                    sys.sendMessage(src, toCorrectCase(authlist[m]) + " (Online):",tourschan)

                }

            }

            sys.sendMessage(src, "",tourschan)

            return true;

        }

        if (command == "tourinfo") {

            try {

                if (commandData == "") {

                    sendBotMessage(src, "Please specify a person!",tourschan,false)

                    return true;

                }

                else {

                    var score = 0;

                    var rankings = sys.getFileContent("tourscores.txt").split("\n")

                    for (var p in rankings) {

                        if (rankings[p] == "") continue;

                        var rankingdata = rankings[p].split(":::",2)

                        if (cmp(rankingdata[0],commandData)) {

                            score = rankingdata[1]

                            break;

                        }

                    }

                    var tourdata = sys.getFileContent("tourdetails.txt")

                    sys.sendMessage(src, "*** TOURNAMENT DETAILS FOR "+commandData+" (Score: "+score+")***",tourschan)

                    var tourinfopieces = tourdata.split("\n")

                    for (var x in tourinfopieces) {

                        var datatoread = tourinfopieces[x].split(":::",4)

                        if (cmp(datatoread[0],commandData)) {

                            sys.sendMessage(src, datatoread[2]+": Won with "+datatoread[1]+" entrants on "+datatoread[3],tourschan)

                        }

                    }

                }

                sys.sendMessage(src, "",tourschan)

            }

            catch (err) {

                sendBotMessage(src, "No data exists yet!",tourschan,false)

            }

            return true;

        }

        if (command == "activeta") {

            sys.sendMessage(src, "",tourschan)

            sys.sendMessage(src, "*** ACTIVE TOURNAMENT ADMINS ***",tourschan)

            var tal = tours.touradmins

            var authlist = sys.dbAuths()

            for (var l in tal) {

                if (sys.id(tal[l]) !== undefined && SESSION.users(sys.id(tal[l])).lastline.time + Config.Tours.activity > parseInt(sys.time())) {

                    sys.sendMessage(src, toCorrectCase(tal[l]), tourschan)

                }

            }

            // displays online active auth in "Tours" channel as well

            for (var m in authlist) {

                if (sys.id(authlist[m]) !== undefined && tal.indexOf(authlist[m]) == -1 && sys.isInChannel(sys.id(authlist[m]), tourschan)  && SESSION.users(sys.id(authlist[m])).lastline.time + Config.Tours.activity > parseInt(sys.time())) {

                    sys.sendMessage(src, toCorrectCase(authlist[m]), tourschan)

                }

            }

            sys.sendMessage(src, "",tourschan)

            return true;

        }

        if (command == "history") {

            sys.sendMessage(src, "*** RECENTLY PLAYED TIERS ***",tourschan)

            for (var x in tours.history) {

                sys.sendMessage(src, tours.history[x],tourschan)

            }

            return true;

        }

        if (command == "help" || command == "commands") {

            sys.sendMessage(src, border,tourschan);

            sys.sendMessage(src, "*** Tournament Commands ***",tourschan);

            for (var t in tourcommands) {

                sys.sendMessage(src, tourcommands[t],tourschan);

            }

            if (isTourAdmin(src)) {

                sys.sendMessage(src, border,tourschan);

                for (var u in touradmincommands) {

                    if (touradmincommands[u] == "*** FOLLOWING COMMANDS ARE ADMIN+ COMMANDS ***" && !isTourSuperAdmin(src)) break;

                    if (touradmincommands[u] == "*** FOLLOWING COMMANDS ARE OWNER+ COMMANDS ***" && !isTourOwner(src)) break;

                    sys.sendMessage(src, touradmincommands[u],tourschan);

                }

            }

            sys.sendMessage(src, border,tourschan);

            return true;

        }

        if (command == "rules" || command == "tourrules") {

            sys.sendMessage(src, border,tourschan);

            for (var t in tourrules) {

                sys.sendMessage(src, tourrules[t],tourschan);

            }

            sys.sendMessage(src, border,tourschan);

            return true;

        }

        if (command == "leaderboard") {

            try {

                if (commandData == "") {

                    var rankings = sys.getFileContent("tourscores.txt").split("\n")

                }

                else {

                    var tiers = sys.getTierList()

                    var found = false;

                    for (var x in tiers) {

                        if (tiers[x].toLowerCase() == commandData.toLowerCase()) {

                            var tourtier = tiers[x];

                            found = true;

                            break;

                        }

                    }

                    if (!found) {

                        throw ("Not a valid tier")

                    }

                    var rankings = sys.getFileContent("tourscores_"+tourtier.replace(/ /g,"_")+".txt").split("\n")

                }

                var list = [];

                for (var p in rankings) {

                    if (rankings[p] == "") continue;

                    var rankingdata = rankings[p].split(":::",2)

                    if (rankingdata[1] < 1) continue;

                    list.push([rankingdata[1], rankingdata[0]]);

                }

                list.sort(function(a,b) { return b[0] - a[0] ; });

                sys.sendMessage(src, "*** TOURNAMENT RANKINGS "+(commandData != "" ? "("+commandData+") " : "")+"***",tourschan)

                var ownnameprinted = false;

                var rankkey = [0, 0] // rank, points

                for (var x=0; x<65536; x++) {

                    if (x >= list.length || (ownnameprinted && rankkey[0]>20)) break;

                    if (rankkey[0] <= 20 || cmp((list[x])[1], sys.name(src))) {

                        if (rankkey[1] === parseInt((list[x])[0])) {

                            sys.sendMessage(src, "#"+rankkey[0]+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                        }

                        else {

                            sys.sendMessage(src, "#"+(x+1)+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                            rankkey = [x+1, parseInt((list[x])[0])]

                        }

                        if (cmp((list[x])[1], sys.name(src))) {

                            ownnameprinted = true;

                        }

                    }

                }

            }

            catch (err) {

                if (err == "Not a valid tier") {

                    sendBotMessage(src, commandData+" is not a valid tier!",tourschan, false)

                }

                else {

                    sendBotMessage(src, "No data exists yet!",tourschan, false)

                }

            }

            return true;

        }

        if (command == "monthlyleaderboard") {

            try {

                var now = new Date()

                var themonths = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "decemeber"]

                if (commandData == "") {

                    var monthlyfile = "tourmonthscore_"+themonths[now.getUTCMonth()]+"_"+now.getUTCFullYear()+".txt"

                }

                else {

                    var monthdata = commandData.toLowerCase().split(" ",2)

                    if (monthdata.length == 1) {

                        monthdata.push(now.getUTCFullYear());

                    }

                    var monthlyfile = "tourmonthscore_"+monthdata[0]+"_"+monthdata[1]+".txt"

                }

                var rankings = sys.getFileContent(monthlyfile).split("\n")

                var list = [];

                for (var p in rankings) {

                    if (rankings[p] == "") continue;

                    var rankingdata = rankings[p].split(":::",2)

                    if (rankingdata[1] < 1) continue;

                    list.push([rankingdata[1], rankingdata[0]]);

                }

                list.sort(function(a,b) { return b[0] - a[0] ; });

                sys.sendMessage(src, "*** MONTHLY TOURNAMENT RANKINGS "+(commandData != "" ? "("+commandData+") " : "")+"***",tourschan)

                var ownnameprinted = false;

                var rankkey = [0, 0] // rank, points

                for (var x=0; x<65536; x++) {

                    if (x >= list.length || (ownnameprinted && rankkey[0]>20)) break;

                    if (rankkey[0] <= 20 || cmp((list[x])[1], sys.name(src))) {

                        if (rankkey[1] === parseInt((list[x])[0])) {

                            sys.sendMessage(src, "#"+rankkey[0]+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                        }

                        else {

                            sys.sendMessage(src, "#"+(x+1)+": "+(list[x])[1]+" ~ "+(list[x])[0]+" point"+((list[x])[0] != 1 ? "s" : ""),tourschan)

                            rankkey = [x+1, parseInt((list[x])[0])]

                        }

                        if (cmp((list[x])[1], sys.name(src))) {

                            ownnameprinted = true;

                        }

                    }

                }

            }

            catch (err) {

                sendBotMessage(src, "No data exists yet for the month "+commandData+"!",tourschan, false)

            }

            return true;

        }

    }

    catch (err) {

        sys.sendAll("Error in Tournament Command '"+command+"': "+err, tourserrchan)

    }

    return false;

}