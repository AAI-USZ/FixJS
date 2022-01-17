function(request, sender, sendResponse) {
        switch(request.need){
            case "config":
                cfg = JSON.parse(localStorage['ChromeLL-Config']);
                if(request.sub){
                    sendResponse({"data": cfg[request.sub]});
                }else if(request.tcs){
                    var tcs = JSON.parse(localStorage['ChromeLL-TCs']);
                    sendResponse({"data": cfg, "tcs": tcs});
                }else{
                    sendResponse({"data": cfg});
                }
                break;
            case "save":
                if(request.name === "tcs"){
                    localStorage['ChromeLL-TCs'] = JSON.stringify(request.data);
                }else{
                    cfg[request.name] = request.data;
                    localStorage['ChromeLL-Config'] = JSON.stringify(cfg);
                }
                if(cfg.debug) console.log('saving ', request.name, request.data);
                break;
            case "notify":
                var notification = webkitNotifications.createNotification(
                    'Style/images/lueshi_48.png',
                    request.title,
                    request.message);
                notification.show();
                if(cfg.close_notifications){
                    setTimeout(function(){notification.cancel();}, (parseInt(cfg.close_notification_time) * 1000));
                }
                break;
            case "dramalinks":
                var time = parseInt(new Date().getTime());
                if(drama.time && (time < drama.time)){
                    if(cfg.debug) console.log('returning cached dramalinks. cache exp: ' + drama.time + ' current: ' + time);
                    sendResponse({"data": drama.txt});
                }else{
                    getDrama();
                    sendResponse({"data":drama.txt});
                }
                break;
            case "insertcss":
                if(cfg.debug) console.log('inserting css ', request.file);
                chrome.tabs.insertCSS(sender.tab.id, {file: request.file});
                sendResponse({});
                break;
            case "opentab":
                if(cfg.debug) console.log('opening tab ', request.url);
                chrome.tabs.create({url: request.url});
                break;
            case "getIgnored":
                chrome.tabs.getSelected(function(tab){
                    sendResponse({"ignorator": ignoratorInfo[tab.id], "scope": scopeInfo[tab.id]});
                });
                break;
            case "showIgnorated":
                chrome.tabs.getSelected(function(tab){
                    tabPorts[tab.id].postMessage({action: 'showIgnorated', ids: request.ids});
                });
                if(cfg.debug) console.log('showing hidden data', request);
                break;
            default:
                if(cfg.debug) console.log("Error in request listener - undefined parameter?", request);
                break;
        }
    }