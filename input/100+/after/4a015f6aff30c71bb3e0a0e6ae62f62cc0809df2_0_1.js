function(src, command, commandData, tar) {
    if (command == "topchannels") {
        var cids = sys.channelIds();
        var l = [];
        for (var i = 0; i < cids.length; ++i) {
            l.push([cids[i], sys.playersOfChannel(cids[i]).length]);
        }
        l.sort(function(a,b) { return b[1]-a[1]; });
        var topchans = l.slice(0,10);
        channelbot.sendChanMessage(src, "Most used channels:");
        for (var i = 0; i < topchans.length; ++i) {
            sendChanMessage(src, "" + sys.channel(topchans[i][0]) + " with " + topchans[i][1] + " players.");
        }
        return;
    }
    if (command == "onrange") {
        var subip = commandData;
        var players = sys.playerIds();
        var players_length = players.length;
        var names = [];
        for (var i = 0; i < players_length; ++i) {
            var current_player = players[i];
            var ip = sys.ip(current_player);
            if (ip.substr(0, subip.length) == subip) {
                names.push(current_player);
            }
        }
        // Tell about what is found.
        if (names.length > 0) {
            var msgs = [];
            for (var i = 0; i < names.length; i++) {
                msgs.push(sys.name(names[i]) + " (" + sys.ip(names[i]) + ")");
            }
            sys.sendMessage(src,"Players: on range " + subip + " are: " + msgs.join(", "), channel);
        } else {
            sys.sendMessage(src,"Players: Nothing interesting here!",channel);
        }
        return;
    }
    if (command == "tier")
    {
        if (tar === undefined){
            querybot.sendChanMessage(src,"No such user online.");
            return;
        }
        querybot.sendChanMessage(src,sys.name(tar)+" is in tier: "+sys.tier(tar,0));
        return;
    }
    if (command == "perm") {
        if (channel == staffchannel || channel === 0) {
            channelbot.sendChanMessage(src, "you can't do that here.");
            return;
        }

        SESSION.channels(channel).perm = (commandData.toLowerCase() == 'on');
        SESSION.global().channelManager.update(channel);
        channelbot.sendChanAll("" + sys.name(src) + (SESSION.channels(channel).perm ? " made the channel permanent." : " made the channel a temporary channel again."));
        return;
    }
    if (command == "silence") {
        if (typeof(commandData) == "undefined") {
            return;
        }
        var minutes;
        var chanName;
        var space = commandData.indexOf(' ');
        if (space != -1) {
            minutes = commandData.substring(0,space);
            chanName = commandData.substring(space+1);
        } else {
            minutes = commandData;
            chanName = sys.channel(channel);
        }
        this.silence(src, minutes, chanName);
        return;
    }
    if (command == "silenceoff") {
        this.silenceoff(src, commandData);
        return;
    }
    if (command == "mafiaban") {
        script.issueBan("mban", src, sys.id(commandData), commandData);
        return;
    }
    if (command == "mafiaunban") {
        if (tar === undefined) {
            if (mbans.get(commandData)) {
                mafiabot.sendAll("IP address " + commandData + " was unbanned from Mafia by " + nonFlashing(sys.name(src)) + "!", staffchannel);
                mbans.remove(commandData);
                return;
            }
            var ip = sys.dbIp(commandData);
            if(ip !== undefined && mbans.get(ip)) {
                mafiabot.sendAll("" + commandData + " was unbanned from Mafia by " + nonFlashing(sys.name(src)) + "!");
                mbans.remove(ip);
                return;
            }
            mafiabot.sendChanMessage(src, "He/she's not banned from Mafia.");
            return;
        }
        if (!SESSION.users(tar).mban.active) {
            mafiabot.sendChanMessage(src, "He/she's not banned from Mafia.");
            return;
        }
        if(SESSION.users(src).mban.active && tar==src) {
           mafiabot.sendChanMessage(src, "You may not unban yourself from Mafia");
           return;
        }
        mafiabot.sendAll("" + commandData + " was unbanned from Mafia by " + nonFlashing(sys.name(src)) + "!");
        SESSION.users(tar).un("mban");
        return;
    }

    if (command == "impoff") {
        delete SESSION.users(src).impersonation;
        normalbot.sendChanMessage(src, "Now you are yourself!");
        return;
    }
    if (command == "k") {
        if (tar === undefined) {
            return;
        }
        normalbot.sendAll("" + commandData + " was mysteriously kicked by " + nonFlashing(sys.name(src)) + "!");
        sys.kick(tar);
        var authname = sys.name(src).toLowerCase();
        authStats[authname] =  authStats[authname] || {};
        authStats[authname].latestKick = [commandData, parseInt(sys.time(), 10)];
        return;
    }

    if (command == "mute") {
        script.issueBan("mute", src, tar, commandData);
        return;
    }
    if (command == "banlist") {
        var list=sys.banList();
        list.sort();
        var nbr_banned=5;
        var max_message_length = 30000;
        var table_header = '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan='+nbr_banned+'><center><strong>Banned list</strong></center></td></tr><tr>';
        var table_footer = '</tr></table>';
        var table=table_header;
        var j=0;
        var line = '';
        for (var i=0; i<list.length; ++i){
            if (typeof commandData == 'undefined' || list[i].toLowerCase().indexOf(commandData.toLowerCase()) != -1){
                ++j;
                line += '<td>'+list[i]+'</td>';
                if(j == nbr_banned &&  i+1 != list.length){
                    if (table.length + line.length + table_footer.length > max_message_length) {
                        if (table.length + table_footer.length <= max_message_length)
                            sys.sendHtmlMessage(src, table + table_footer, channel);
                        table = table_header;
                    }
                    table += line + '</tr><tr>';
                    line = '';
                    j=0;
                }
            }
        }
        table += table_footer;
        sys.sendHtmlMessage(src, table.replace('</tr><tr></tr></table>', '</tr></table>'),channel);
        return;

    }
    if (command == "mutelist" || command == "smutelist" || command == "mafiabans") {
        var mh;
        var name;
        if (command == "mutelist") {
            mh = mutes;
            name = "Muted list";
        } else if (command == "smutelist") {
            mh = smutes;
            name = "Secretly muted list";
        } else if (command == "mafiabans") {
            mh = mbans;
            name = "Mafiabans";
        }

        var width=5;
        var max_message_length = 30000;
        var tmp = [];
        var t = parseInt(sys.time(), 10);
        var toDelete = [];
        for (var ip in mh.hash) {
            var values = mh.hash[ip].split(":");
            var banTime = 0;
            var by = "";
            var expires = 0;
            var banned_name;
            var reason = "";
            if (values.length >= 5) {
                banTime = parseInt(values[0], 10);
                by = values[1];
                expires = parseInt(values[2], 10);
                banned_name = values[3];
                reason = values.slice(4);
                if (expires !== 0 && expires < t) {
                    toDelete.push(ip);
                    continue;
                }
            } else if (command == "smutelist") {
                var aliases = sys.aliases(ip);
                if (aliases[0] !== undefined) {
                    banned_name = aliases[0];
                } else {
                    banned_name = "~Unknown~";
                }
            } else {
                banTime = parseInt(values[0], 10);
            }
            if(typeof commandData != 'undefined' && (!banned_name || banned_name.toLowerCase().indexOf(commandData.toLowerCase()) == -1))
                continue;
            tmp.push([ip, banned_name, by, (banTime === 0 ? "unknown" : getTimeString(t-banTime)), (expires === 0 ? "never" : getTimeString(expires-t)), utilities.html_escape(reason)]);
        }
        for (var k = 0; k < toDelete.length; ++k)
           delete mh.hash[toDelete[k]];
        if (toDelete.length > 0)
            mh.save();

        tmp.sort(function(a,b) { return a[3] - b[3];});

        // generate HTML
        var table_header = '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="' + width + '"><center><strong>' + utilities.html_escape(name) + '</strong></center></td></tr><tr><th>IP</th><th>Name</th><th>By</th><th>Issued ago</th><th>Expires in</th><th>Reason</th>';
        var table_footer = '</table>';
        var table = table_header;
        var line;
        var send_rows = 0;
        while(tmp.length > 0) {
            line = '<tr><td>'+tmp[0].join('</td><td>')+'</td></tr>';
            tmp.splice(0,1);
            if (table.length + line.length + table_footer.length > max_message_length) {
                if (send_rows === 0) continue; // Can't send this line!
                table += table_footer;
                sys.sendHtmlMessage(src, table, channel);
                table = table_header;
                send_rows = 0;
            }
            table += line;
            ++send_rows;
        }
        table += table_footer;
        if (send_rows > 0)
            sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "rangebans") {
        var TABLE_HEADER, TABLE_LINE, TABLE_END;
        if (!commandData || commandData.indexOf('-text') == -1) {
           TABLE_HEADER = '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="2"><center><strong>Range banned</strong></center></td></tr><tr><th>IP subaddress</th><th>Comment on rangeban</th></tr>';
           TABLE_LINE = '<tr><td>{0}</td><td>{1}</td></tr>';
           TABLE_END = '</table>';
        } else {
           TABLE_HEADER = 'Range banned: IP subaddress, Command on rangeban';
           TABLE_LINE = ' || {0} / {1}';
           TABLE_END = '';
        }
        try {
        var table = TABLE_HEADER;
        var tmp = [];
        for (var key in rangebans.hash) {
            tmp.push([key, rangebans.get(key)]);
        }
        tmp.sort(function(a,b) { return a[0] < b[0] ? -1 : 1; });
        for (var row = 0; row < tmp.length; ++row) {
            table += TABLE_LINE.format(tmp[row][0], tmp[row][1]);
        }
        table += TABLE_END;
        sys.sendHtmlMessage(src, table, channel);
        } catch (e) { sys.sendMessage(src, e, channel); }
        return;
    }
    if (command == "tempbans") {
        var t = parseInt(sys.time(), 10);
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="6"><center><strong>Temp banned</strong></center></td></tr><tr><th>IP</th><th>Name</th><th>By</th><th>Length</th><th>Expires in</th><th>Reason</th></tr>';
        for (var ip in tempBans) {
            if(this.isTempBanned(ip) === false){
               continue;
            }
            var ban_length = tempBans[ip].length === undefined ? "undefined" : getTimeString(tempBans[ip].length);
            var auth = tempBans[ip].auth === undefined ? "undefined" : tempBans[ip].auth;
            var time = tempBans[ip].time === undefined ? "undefined" : tempBans[ip].time;
            var expire_time = tempBans[ip].time === undefined ? "undefined" : getTimeString(tempBans[ip].time - t);
            var reason = tempBans[ip].reason === undefined ? "undefined" : tempBans[ip].reason;
            var target = tempBans[ip].target === undefined ? "undefined" : tempBans[ip].target;
            table += '<tr><td>' + ip +
                '</td><td>'     + target +
                '</td><td>'     + auth +
                '</td><td>'     + ban_length +
                '</td><td>'     + expire_time +
                '</td><td>'     + reason +
                '</td><td>'     + time +
                '</td></tr>';
        }
        table += '</table>';
        sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "namebans") {
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="2"><center><strong>Name banned</strong></center></td></tr>';
        for (var i = 0; i < nameBans.length; i+=5) {
            table += '<tr>';
            for (var j = 0; j < 5 && i+j < nameBans.length; ++j) {
                table += '<td>'+nameBans[i+j].toString()+'</td>';
            }
            table += '</tr>';
        }
        table += '</table>';
        sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "namewarns") {
        var table = '';
        table += '<table border="1" cellpadding="5" cellspacing="0"><tr><td colspan="2"><center><strong>Namewarnings</strong></center></td></tr>';
        for (var i = 0; i < nameWarns.length; i+=5) {
            table += '<tr>';
            for (var j = 0; j < 5 && i+j < nameWarns.length; ++j) {
                table += '<td>'+nameWarns[i+j].toString()+'</td>';
            }
            table += '</tr>';
        }
        table += '</table>';
        sys.sendHtmlMessage(src, table, channel);
        return;
    }
    if (command == "unmute") {
        if (tar === undefined) {
            if (mutes.get(commandData)) {
                normalbot.sendAll("IP address " + commandData + " was unmuted by " + nonFlashing(sys.name(src)) + "!", staffchannel);
                mutes.remove(commandData);
                return;
            }
            var ip = sys.dbIp(commandData);
            if(ip !== undefined && mutes.get(ip)) {
                normalbot.sendAll("" + commandData + " was unmuted by " + nonFlashing(sys.name(src)) + "!");
                mutes.remove(ip);
                return;
            }
            normalbot.sendChanMessage(src, "He/she's not muted.");
            return;
        }
        if (!SESSION.users(sys.id(commandData)).mute.active) {
            normalbot.sendChanMessage(src, "He/she's not muted.");
            return;
        }
        if(SESSION.users(src).mute.active && tar==src) {
           normalbot.sendChanMessage(src, "You may not unmute yourself!");
           return;
        }
        SESSION.users(tar).un("mute");
        normalbot.sendAll("" + commandData + " was unmuted by " + nonFlashing(sys.name(src)) + "!");
        return;
    }
    if (command == "battlehistory") {
        if (tar === undefined) {
            querybot.sendChanMessage(src, "Usage: /battleHistory username. Only works on online users.");
            return;
        }
        var hist = SESSION.users(tar).battlehistory;
        if (!hist) {
            querybot.sendChanMessage(src, "Your target has not battled after logging in.");
            return;
        }
        var res = [];
        for (var i = 0; i < hist.length; ++i) {
             res.push("Battle against <b>" + hist[i][0] + "</b>, result <b>" + hist[i][1] + "</b>" + (hist[i][2] == "forfeit" ? " <i>due to forfeit</i>." : "."));
        }
        sys.sendHtmlMessage(src, res.join("<br>"), channel);
        return;
    }
    if (command == "userinfo" || command == "whois" || command == "whoistxt") {
        if (commandData === undefined) {
            querybot.sendChanMessage(src, "Please provide a username.");
            return;
        }
        var name = commandData;
        var isbot = false;
        if (commandData[0] == "~") {
            name = commandData.substring(1);
            tar = sys.id(name);
            isbot = true;
        }
        var lastLogin = sys.dbLastOn(name);
        if (lastLogin === undefined) {
            querybot.sendChanMessage(src, "No such user.");
            return;
        }

        var registered = sys.dbRegistered(name);
        var megauser = (megausers.toLowerCase().indexOf("*" + name.toLowerCase() + "*") != -1);
        var contribution = contributors.hash.hasOwnProperty(name) ? contributors.get(name) : "no";
        var authLevel;
        var ip;
        var online;
        var channels = [];
        if (tar !== undefined) {
            name = sys.name(tar); // fixes case
            authLevel = sys.auth(tar);
            ip = sys.ip(tar);
            online = true;
            var chans = sys.channelsOfPlayer(tar);
            for (var i = 0; i < chans.length; ++i) {
                channels.push("#"+sys.channel(chans[i]));
            }
        } else {
            authLevel = sys.dbAuth(name);
            ip = sys.dbIp(name);
            online = false;
        }
        var isBanned = false;
        var banlist=sys.banList();
        for(var a in banlist) {
            if(ip == sys.dbIp(banlist[a])) {
                isBanned = true;
                break;
            }
        }
        var nameBanned = this.nameIsInappropriate(name);
        var rangeBanned = this.isRangeBanned(ip);
        var tempBanned = this.isTempBanned(ip);
        var bans = [];
        if (isBanned) bans.push("normal ban");
        if (nameBanned) bans.push("nameban");
        if (rangeBanned) bans.push("rangeban");
        if (tempBanned) bans.push("tempban");

        if (isbot) {
            var userJson = {'type': 'UserInfo', 'id': tar ? tar : -1, 'username': name, 'auth': authLevel, 'megauser': megauser, 'contributor': contribution, 'ip': ip, 'online': online, 'registered': registered, 'lastlogin': lastLogin };
            sendChanMessage(src, ":"+JSON.stringify(userJson));
        } else if (command == "userinfo") {
            querybot.sendChanMessage(src, "Username: " + name + " ~ auth: " + authLevel + " ~ megauser: " + megauser + " ~ contributor: " + contribution + " ~ ip: " + ip + " ~ online: " + (online ? "yes" : "no") + " ~ registered: " + (registered ? "yes" : "no") + " ~ last login: " + lastLogin + " ~ banned: " + (isBanned ? "yes" : "no"));
        } else if (command == "whois") {
            var authName = function() {
                switch (authLevel) {
                case 3: return "owner";
                case 2: return "admin";
                case 1: return "moderator";
                default: return megauser ? "megauser" : contribution != "no" ? "contributor" : "user";
                }
            }();

            var logintime = false;
            if (online) logintime = SESSION.users(tar).logintime;
            var data = [
               "User: " + name + " @ " + ip,
               "Auth: " + authName,
               "Online: " + (online ? "yes" : "no"),
               "Registered name: " + (registered ? "yes" : "no"),
               "Last Login: " + (online && logintime ? new Date(logintime*1000).toUTCString() : lastLogin),
                bans.length > 0 ? "Bans: " + bans.join(", ") : "Bans: none"
            ];
            if (online) {
                if (SESSION.users(tar).hostname != ip)
                    data[0] += " (" + SESSION.users(tar).hostname + ")";
                data.push("Idle for: " + getTimeString(parseInt(sys.time(), 10) - SESSION.users(tar).lastline.time));
                data.push("Channels: " + channels.join(", "));
                data.push("Names during current session: " + (online && SESSION.users(tar).namehistory ? SESSION.users(tar).namehistory.map(function(e){return e[0];}).join(", ") : name));
            }
            if (authLevel > 0) {
               var stats = authStats[name.toLowerCase()] || {};
               for (var key in stats) {
                   data.push("Latest " + key.substr(6).toLowerCase() + ": " + stats[key][0] + " on " + new Date(stats[key][1]*1000).toUTCString());
               }
            }
            for (var j = 0; j < data.length; ++j) {
                sendChanMessage(src, data[j]);
            }
        }

        return;
    }
    if (command == "aliases") {
        var max_message_length = 30000;
        var uid = sys.id(commandData);
        var ip = commandData;
        if (uid !== undefined) {
            ip = sys.ip(uid);
        } else if (sys.dbIp(commandData) !== undefined) {
            ip = sys.dbIp(commandData);
        }
        var smessage = "The aliases for the IP " + ip + " are: ";
        var aliases = sys.aliases(ip);
        var prefix = "";
        for(var i = 0; i < aliases.length; ++i) {
            var id = sys.id(aliases[i]);
            var status = (id !== undefined) ? "online" : "Last Login: " + sys.dbLastOn(aliases[i]);
            if(sys.dbAuth(aliases[i])>sys.auth(src) && aliases[i] !== commandData.toLowerCase() && sys.auth(src) < 3){
                continue;
            }
            if(sys.dbAuth(aliases[i])>sys.auth(src) && aliases[i] === commandData.toLowerCase() && sys.auth(src) < 3){
                smessage = "The aliases for the IP " + ip + " are: " + aliases[i] + " ("+status+"), ";
                break;
            }
            smessage = smessage + aliases[i] + " ("+status+"), ";
            if (smessage.length > max_message_length) {
                querybot.sendChanMessage(src, prefix + smessage + " ...");
                prefix = "... ";
                smessage = "";
            }
        }
        querybot.sendChanMessage(src, prefix + smessage);
        return;
    }
   if (command == "tempban") {
	var tmp = commandData.split(":");
	if (tmp.length != 3) {
		normalbot.sendChanMessage(src, "Usage /tempban name:reason:minutes.");
		return;
	}
	
	var target_name = tmp[0];
	var reason = tmp[1];
	if (isNaN(tmp[2][0])) {
		var minutes = 86400;
	} else {
		var minutes = getSeconds(tmp[2]);
	}
	tar = sys.id(target_name);
	var minutes = parseInt(minutes, 10);
	var timeString = getTimeString(minutes);
	if (sys.auth(src) < 2 && minutes > 86400) {
		normalbot.sendChanMessage(src, "Cannot ban for longer than a day!");
		return;
	}
	var ip;
	var name;
	if (tar === undefined) {
		ip = sys.dbIp(target_name);
		name = target_name;
		if (ip === undefined) {
			normalbot.sendChanMessage(src, "No such name online / offline.");
			return;
		}
	} else {
		ip = sys.ip(tar);
		name = sys.name(tar);
	}
	
	if (sys.maxAuth(ip) >= sys.auth(src)) {
		normalbot.sendChanMessage(src, "Can't do that to higher auth!");
		return;
	}
	var authname = sys.name(src).toLowerCase();
	tempBans[ip] = {
		'auth' : authname,
		'time' : parseInt(sys.time(), 10) + minutes,
		'length' : minutes,
		'reason' : reason,
		'target' : target_name
	};
	normalbot.sendAll("" + nonFlashing(sys.name(src)) + " banned " + name + " on " + ip + " for " + timeString + "! [Reason: " + reason + "]");
	sys.kick(tar);
	this.kickAll(ip);
	
	authStats[authname] = authStats[authname] || {};
	authStats[authname].latestTempBan = [name, parseInt(sys.time(), 10)];
	return;
    }
    if (command == "tempunban") {
        var ip = sys.dbIp(commandData);
        if (ip === undefined) {
            normalbot.sendChanMessage(src, "No such user!");
            return;
        }
        if (!(ip in tempBans)) {
            normalbot.sendChanMessage(src, "No such user tempbanned!");
            return;
        }
        var now = parseInt(sys.time(), 10);
        normalbot.sendAll("" + commandData + " was released from their cell by " + nonFlashing(sys.name(src)) + " just " + ((tempBans[ip].time - now)/60).toFixed(2) + " minutes beforehand!");
        delete tempBans[ip];
        return;
    }
    if (command == "passauth" || command == "passauths") {
        if (tar === undefined) {
            normalbot.sendChanMessage(src, "The target is offline.");
            return;
        }
        if (sys.ip(src) == sys.ip(tar) && sys.auth(tar) === 0) {
            // fine
        }
        else {
            if (sys.auth(src) !== 0 || !SESSION.users(src).megauser) {
                normalbot.sendChanMessage(src, "You need to be mega-auth to pass auth.");
                return;
            }
            if (!SESSION.users(tar).megauser || sys.auth(tar) > 0) {
                normalbot.sendChanMessage(src, "The target must be megauser and not auth, or from your IP.");
                return;
            }
        }
        if (!sys.dbRegistered(sys.name(tar))) {
            normalbot.sendChanMessage(src, "The target name must be registered.");
            return;
        }
        var current = sys.auth(src);
        sys.changeAuth(src, 0);
        sys.changeAuth(tar, current);
        if (command == "passauth")
            normalbot.sendAll(sys.name(src) + " passed their auth to " + sys.name(tar) + "!", staffchannel);
        return;
    }
    if (sys.name(src) == "Viderizer" && (command == "ban" || command == "unban")) {
        return this.adminCommand(src, command, commandData, tar);
    }
    if (command == "skmute" && (sys.auth(src) >= 1 || [/* insert mod list here when this goes to admin+ */].indexOf(sys.name(src).toLowerCase()) >= 0)) {
        if (tar === undefined)
            normalbot.sendMessage(src, "use only for online target ", channel);
        else {
            normalbot.sendAll("Target: " + sys.name(tar) + ", IP: " + sys.ip(tar) + ", Auth: "+ sys.name(src), staffchannel);
            script.issueBan("smute", src, undefined, "" + sys.name(tar) + ":skarmpiss:2h");
        }
        return;
    }
    if (cmp(sys.name(src),"ethan") && ["setwebannouncement", "testwebannouncement", "setannouncement", "testannouncement", "getannouncement"].indexOf(command) != -1) {
       return this.ownerCommand(src, command, commandData, tar);
    }
    if (cmp(sys.name(src),"aerith") && command == "updateplugin" && commandData == "tours.js") {
       return this.ownerCommand(src, command, commandData, tar);
    }
    return "no command";
}