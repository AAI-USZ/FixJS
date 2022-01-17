function () {
    var ws, connected = false, backoff = 1000;

    if (!localStorage.queue) {
        localStorage.queue = JSON.stringify([]);
    }

    if (!localStorage.client_id) {
        localStorage.client_id = (new Date()).getTime().toString();
    }

    function addToQueue(event) {
        var queue = JSON.parse(localStorage.queue);
        queue.push(event);
        chrome.browserAction.setBadgeText(
            {"text":
             queue.length < 10000 ? queue.length.toString() : "9999"});
        localStorage.queue = JSON.stringify(queue);
    }

    // TODO: now it is possible to lose events, fixit
    function emptyQueue(callback) {
        var queue = JSON.parse(localStorage.queue);
        queue.forEach(callback);
        chrome.browserAction.setBadgeText({"text": ""});
        localStorage.queue = JSON.stringify([]);
    }

    function setupWebsocket() {
        ws = new WebSocket("ws://localhost:8765/tabs");
        ws.onopen = function () {
            console.log("Connected!");
            backoff = 1000;
            connected = true;
            emptyQueue(function (event) {
                ws.send(JSON.stringify(event));
            });
        };
        ws.onclose = function () {
            connected = false;
            console.log("connection to WebSocket closed! " +
                        "trying again in " + Math.floor(backoff / 1000) +
                        " seconds.");
            setTimeout(setupWebsocket, Math.random() * backoff + backoff / 2);
            if (backoff < 180000) {
                backoff *= 2;
            }
        };
        ws.onmessage = function (evt) {
            console.log(evt);
        };
    }

    function addEvent(event) {
        if (connected) {
            ws.send(JSON.stringify(event));
        } else {
            addToQueue(event);
        }
    }

    function addEventForTab(eventType, tab) {
        var event = {"event": eventType,
                     "client_id": localStorage.client_id,
                     "tabId": tab.id,
                     "windowId": tab.windowId,
                     "title": tab.title,
                     "url": tab.url,
                     "active": tab.active,
                     "time": new Date()};
        addEvent(event);
    }

    function addEventByTabAndWindowId(eventType, tabId, windowId) {
        var event = {"event": eventType,
                     "client_id": localStorage.client_id,
                     "tabId": tabId,
                     "time": new Date()
                    };
        if (windowId !== chrome.windows.WINDOW_ID_NONE) {
            event.windowId = windowId;
        }
        addEvent(event);
    }

    function addEventByTabId(eventType, tabId) {
        addEventByTabAndWindowId(eventType, tabId,
                                 chrome.windows.WINDOW_ID_NONE);
    }

    setupWebsocket();

    chrome.windows.getAll(null, function (windows) {
        windows.forEach(function (window) {
            chrome.tabs.getAllInWindow(window.id, function (tabs) {
                tabs.forEach(function (tab) {
                    addEventForTab("startup", tab);
                });
            });
        });
    });

    chrome.tabs.onCreated.addListener(function (tab) {
        addEventForTab("created", tab);
    });

    chrome.tabs.onRemoved.addListener(function (tabId) {
        addEventByTabId("removed", tabId);
    });

    chrome.tabs.onActiveChanged.addListener(function (tabId, selectInfo) {
        addEventByTabAndWindowId("activeChanged", tabId, selectInfo.windowId);
    });

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.url) {
            addEventForTab("updated", tab);
        }
    });

    chrome.windows.onFocusChanged.addListener(function (windowId) {
        var query, event;
        if (windowId !== -1) {
            query = {"active": true, "windowId": windowId};
            chrome.tabs.query(query, function (tabs) {
                tabs.forEach(function (tab) {
                    addEventForTab("activeChanged", tab);
                });
            });
        } else {
            event = {"event": "unfocused",
                     "client_id": localStorage.client_id,
                     "windowId": windowId,
                     "time": new Date()};
            addEvent(event);
        }
    });

    chrome.browserAction.onClicked.addListener(function (tab) {
        addEventForTab("watched", tab);
    });
}