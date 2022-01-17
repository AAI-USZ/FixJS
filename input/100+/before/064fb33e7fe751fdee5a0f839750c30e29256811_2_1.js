function (roomChange) {
        var x, listenerCount = 0;

        if (ttp.roominfo === null || roomChange) {
            for (x in turntable) {
                if (typeof turntable[x] === "object" && turntable[x] !== null && turntable[x].hasOwnProperty("selfId") && turntable[x].selfId === turntable.user.id) {
                    ttp.roominfo = turntable[x];
                    break;
                }
            }
        }
        if (ttp.roominfo !== null) {
            for (x in ttp.roominfo) {
                if (typeof ttp.roominfo[x] === "object" && ttp.roominfo[x] !== null && ttp.roominfo[x].hasOwnProperty("myuserid") && ttp.roominfo[x].myuserid === turntable.user.id) {
                    ttp.roommanager = ttp.roominfo[x];
                    break;
                }
            }
        }
        if (ttp.roommanager !== null) {
            for (x in ttp.roommanager.listeners) {
                if (ttp.roommanager.listeners[x].hasOwnProperty('isAvatar') === true) {
                    listenerCount += 1;
                }
            }
        }
        if (ttp.roominfo === null || ttp.roommanager === null || listenerCount === 0) {
            window.setTimeout(ttp.getRoomObjects, 100, roomChange);
        } else if (roomChange === true) {
            ttp.ready(ttp.checkForCustomizations);
        } else {
            ttp.ttpMessage("TT Objects Ready");
            ttp.ready(ttp.checkForCustomizations);
            ttp.ready(function () {
                if (ttp.handlePM === $.noop) {
                    ttp.handlePM = ttp.roominfo.handlePM;
                    ttp.roominfo.handlePM = function (msg, focus) {
                        var json;
                        if (msg.senderid === ttp.authBot) {
                            try {
                                json = JSON.parse(msg.text);
                                if (json.message === 'authenticate') {
                                    ttp.request({api: 'pm.send', receiverid: ttp.authBot, text: JSON.stringify({userid: turntable.user.id, ts: json.ts, auth: $.sha1(turntable.user.auth)})});
                                }
                            } catch (e) {}
                        } else {
                            ttp.handlePM(msg, focus);
                        }
                    }
                }
            });
        }
    }